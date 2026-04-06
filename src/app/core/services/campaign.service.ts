import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { AuthService } from './auth.service';

export interface Campaign {
  id: string;
  brand_id: string;
  title: string;
  description: string;
  budget: number;
  status: 'draft' | 'active' | 'completed';
  niche: string;
  deadline: string;
  created_at: string;
  profiles?: { full_name: string };
  application_count?: number;
}

export interface Application {
  id: string;
  campaign_id: string;
  influencer_id: string;
  proposal_text: string;
  rate: number;
  status: 'pending' | 'accepted' | 'rejected';
  created_at: string;
  campaigns?: Campaign;
  profiles?: { full_name: string; avatar_url: string };
}

@Injectable({ providedIn: 'root' })
export class CampaignService {
  private supabase: any;

  constructor(
    private supabaseService: SupabaseService,
    private authService: AuthService
  ) {
    this.supabase = this.supabaseService.client;
  }

  // ---- Campaigns ----
  async getCampaigns(): Promise<Campaign[]> {
    const userId = this.authService.getCurrentUser()?.id;
    if (!userId) return [];
    const { data, error } = await this.supabase
      .from('campaigns')
      .select('*')
      .eq('brand_id', userId)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return (data as Campaign[]) ?? [];
  }

  async getAllActiveCampaigns(): Promise<Campaign[]> {
    const { data, error } = await this.supabase
      .from('campaigns')
      .select('*, profiles(full_name)')
      .eq('status', 'active')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return (data as Campaign[]) ?? [];
  }

  async createCampaign(campaign: Partial<Campaign>): Promise<Campaign> {
    const userId = this.authService.getCurrentUser()?.id;
    const { data, error } = await this.supabase
      .from('campaigns')
      .insert({ ...campaign, brand_id: userId })
      .select()
      .single();
    if (error) throw error;
    return data as Campaign;
  }

  async updateCampaign(id: string, updates: Partial<Campaign>): Promise<void> {
    const { error } = await this.supabase
      .from('campaigns')
      .update(updates)
      .eq('id', id);
    if (error) throw error;
  }

  async deleteCampaign(id: string): Promise<void> {
    const { error } = await this.supabase
      .from('campaigns')
      .delete()
      .eq('id', id);
    if (error) throw error;
  }

  // ---- Dashboard Stats ----
  async getDashboardStats() {
    const userId = this.authService.getCurrentUser()?.id;
    const role = this.authService.userRole();
    if (!userId) return null;

    if (role === 'brand') {
      const [campaignsRes, applicationsRes] = await Promise.all([
        this.supabase.from('campaigns').select('id, status').eq('brand_id', userId),
        this.supabase.from('applications').select('id, status, campaigns!inner(brand_id)').eq('campaigns.brand_id', userId),
      ]);
      const campaigns: any[] = campaignsRes.data ?? [];
      const applications: any[] = applicationsRes.data ?? [];
      return {
        totalCampaigns: campaigns.length,
        activeCampaigns: campaigns.filter((c: any) => c.status === 'active').length,
        totalApplications: applications.length,
        pendingApplications: applications.filter((a: any) => a.status === 'pending').length,
      };
    } else {
      const [appsRes, acceptedRes] = await Promise.all([
        this.supabase.from('applications').select('id, status').eq('influencer_id', userId),
        this.supabase.from('applications').select('id').eq('influencer_id', userId).eq('status', 'accepted'),
      ]);
      const apps: any[] = appsRes.data ?? [];
      return {
        totalApplications: apps.length,
        acceptedApplications: acceptedRes.data?.length ?? 0,
        pendingApplications: apps.filter((a: any) => a.status === 'pending').length,
      };
    }
  }

  // ---- Applications ----
  async applyToCampaign(campaignId: string, proposalText: string, rate: number): Promise<void> {
    const userId = this.authService.getCurrentUser()?.id;
    const { error } = await this.supabase.from('applications').insert({
      campaign_id: campaignId,
      influencer_id: userId,
      proposal_text: proposalText,
      rate,
    });
    if (error) throw error;
  }

  async getMyApplications(): Promise<Application[]> {
    const userId = this.authService.getCurrentUser()?.id;
    if (!userId) return [];
    const { data, error } = await this.supabase
      .from('applications')
      .select('*, campaigns(*)')
      .eq('influencer_id', userId)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return (data as Application[]) ?? [];
  }

  async getBrandApplications(): Promise<Application[]> {
    const userId = this.authService.getCurrentUser()?.id;
    if (!userId) return [];
    const { data, error } = await this.supabase
      .from('applications')
      .select('*, campaigns!inner(*), profiles(full_name, avatar_url)')
      .eq('campaigns.brand_id', userId)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return (data as Application[]) ?? [];
  }

  async updateApplicationStatus(applicationId: string, status: 'accepted' | 'rejected'): Promise<void> {
    const { error } = await this.supabase
      .from('applications')
      .update({ status })
      .eq('id', applicationId);
    if (error) throw error;
  }
}

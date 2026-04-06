import { Injectable, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { Session, User } from '@supabase/supabase-js';
import { SupabaseService } from './supabase.service';

export interface Profile {
  id: string;
  full_name: string;
  role: 'brand' | 'influencer';
  avatar_url?: string;
  bio?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private supabase: any;

  // Reactive signals
  session = signal<Session | null>(null);
  profile = signal<Profile | null>(null);
  loading = signal(true);

  isLoggedIn = computed(() => !!this.session());
  userRole = computed(() => this.profile()?.role ?? null);

  constructor(
    private supabaseService: SupabaseService,
    private router: Router
  ) {
    this.supabase = this.supabaseService.client;
    // Initialize session
    this.supabase.auth.getSession().then(({ data }: any) => {
      this.session.set(data.session);
      if (data.session?.user) this.loadProfile(data.session.user.id);
      this.loading.set(false);
    });

    // Listen for auth changes
    this.supabase.auth.onAuthStateChange((_event: any, session: any) => {
      this.session.set(session);
      if (session?.user) {
        this.loadProfile(session.user.id);
      } else {
        this.profile.set(null);
      }
    });
  }

  private async loadProfile(userId: string) {
    const { data } = await this.supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    if (data) this.profile.set(data as Profile);
  }

  async signUp(email: string, password: string, fullName: string, role: 'brand' | 'influencer') {
    const { data, error } = await this.supabase.auth.signUp({ email, password });
    if (error) throw error;
    if (data.user) {
      await this.supabase.from('profiles').insert({
        id: data.user.id,
        full_name: fullName,
        role,
      });
    }
    return data;
  }

  async signIn(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  }

  async signOut() {
    await this.supabase.auth.signOut();
    this.router.navigate(['/']);
  }

  getCurrentUser(): User | null {
    return this.session()?.user ?? null;
  }

  async updateProfile(updates: Partial<Profile>) {
    const user = this.getCurrentUser();
    if (!user) throw new Error('Not logged in');

    const { data, error } = await this.supabase
      .from('profiles')
      .update(updates)
      .eq('id', user.id)
      .select()
      .single();

    if (error) throw error;
    if (data) {
      this.profile.set(data as Profile);
    }
  }

  async getCreators(): Promise<Profile[]> {
    const { data, error } = await this.supabase
      .from('profiles')
      .select('id, full_name, avatar_url, bio')
      .eq('role', 'influencer')
      .order('full_name', { ascending: true });
      
    if (error) throw error;
    return (data as Profile[]) ?? [];
  }
}

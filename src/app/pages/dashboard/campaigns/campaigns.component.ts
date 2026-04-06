import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CampaignService, Campaign, Application } from '../../../core/services/campaign.service';

@Component({
  selector: 'app-campaigns',
  standalone: true,
  imports: [CommonModule, RouterLink, DatePipe],
  template: `
    <div class="campaigns-page animate-fade-up">
      <div class="page-header">
        <div>
          <h1 class="page-title">My Campaigns</h1>
          <p class="page-subtitle">Manage your influencer marketing campaigns and evaluate proposals</p>
        </div>
        <a routerLink="/dashboard/campaigns/new" class="btn btn-primary">
          <span style="font-size: 18px; margin-right: 4px">+</span> Create Campaign
        </a>
      </div>
      
      <div class="tabs-container">
        <button 
          class="tab-btn" 
          [class.active]="activeTab() === 'campaigns'" 
          (click)="activeTab.set('campaigns')">
          Campaigns
        </button>
        <button 
          class="tab-btn" 
          [class.active]="activeTab() === 'proposals'" 
          (click)="activeTab.set('proposals')">
          Received Proposals
          @if (pendingCount() > 0) {
            <span class="badge" style="background: var(--primary); color: white; margin-left: 6px;">{{ pendingCount() }}</span>
          }
        </button>
      </div>

      @if (loading()) {
        <div class="campaign-list">
          <div class="skeleton" style="height: 140px; border-radius: var(--radius-lg)"></div>
          <div class="skeleton" style="height: 140px; border-radius: var(--radius-lg)"></div>
        </div>
      } @else if (activeTab() === 'campaigns') {
        @if (campaigns().length === 0) {
          <div class="empty-state">
             <div class="empty-state-icon">◈</div>
             <h3>No campaigns yet</h3>
             <p>Create your first campaign to start finding creators.</p>
             <a routerLink="/dashboard/campaigns/new" class="btn btn-primary" style="margin-top: 16px">Create Campaign</a>
          </div>
        } @else {
          <div class="campaign-list">
            @for (campaign of campaigns(); track campaign.id) {
              <div class="glass-card campaign-card">
                <div class="campaign-header">
                  <div>
                    <h3 class="campaign-title">{{ campaign.title }}</h3>
                    <div class="campaign-meta">
                      <span>Budget: ₹{{ campaign.budget | number }}</span>
                      <span>•</span>
                      <span>Niche: {{ campaign.niche }}</span>
                      <span>•</span>
                       <span>Deadline: {{ campaign.deadline | date:'mediumDate' }}</span>
                    </div>
                  </div>
                  <!-- Status Badge -->
                  <span class="badge" [ngClass]="{
                    'badge-active': campaign.status === 'active',
                    'badge-draft': campaign.status === 'draft',
                    'badge-completed': campaign.status === 'completed'
                  }">
                    {{ campaign.status | titlecase }}
                  </span>
                </div>
                <p class="campaign-desc">{{ campaign.description }}</p>
              </div>
            }
          </div>
        }
      } @else {
        @if (proposals().length === 0) {
          <div class="empty-state">
             <div class="empty-state-icon">✉</div>
             <h3>No proposals yet</h3>
             <p>When influencers apply to your campaigns, they will appear here.</p>
          </div>
        } @else {
           <div class="campaign-list">
            @for (proposal of proposals(); track proposal.id) {
              <div class="glass-card campaign-card">
                <div class="campaign-header">
                  <div style="display: flex; align-items: center; gap: 12px;">
                    <img [src]="proposal.profiles?.avatar_url || 'assets/default-avatar.png'" class="avatar" alt="Avatar" />
                    <div>
                      <h3 class="campaign-title" style="margin-bottom: 2px;">{{ proposal.profiles?.full_name || 'Anonymous Creator' }}</h3>
                      <div class="campaign-meta">
                        <span>Campaign: {{ proposal.campaigns?.title || 'Unknown' }}</span>
                        <span>•</span>
                        <span>Proposed Rate: ₹{{ proposal.rate | number }}</span>
                      </div>
                    </div>
                  </div>
                  <span class="badge" [ngClass]="{
                    'badge-active': proposal.status === 'accepted',
                    'badge-draft': proposal.status === 'pending',
                    'badge-completed': proposal.status === 'rejected'
                  }">
                    {{ proposal.status | titlecase }}
                  </span>
                </div>
                
                <div class="proposal-content">
                  <p class="campaign-desc" style="white-space: pre-wrap; font-style: italic;">"{{ proposal.proposal_text }}"</p>
                </div>
                
                @if (proposal.status === 'pending') {
                  <div class="proposal-actions">
                    <button class="btn btn-outline" (click)="updateStatus(proposal.id, 'rejected')">Reject</button>
                    <button class="btn btn-primary" (click)="updateStatus(proposal.id, 'accepted')">Accept Application</button>
                  </div>
                }
              </div>
            }
          </div>
        }
      }
    </div>
  `,
  styles: [`
    .page-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px; }
    .page-title { font-size: 32px; font-weight: 700; letter-spacing: -0.02em; }
    .page-subtitle { color: var(--text-secondary); margin-top: 4px; font-size: 15px; }

    .tabs-container {
      display: flex;
      gap: 32px;
      margin-bottom: 24px;
      border-bottom: 1px solid var(--border-weak);
    }
    .tab-btn {
      background: none;
      border: none;
      padding: 12px 0;
      color: var(--text-secondary);
      font-size: 15px;
      font-weight: 500;
      cursor: pointer;
      position: relative;
      transition: color 0.2s ease;
    }
    .tab-btn.active {
      color: var(--text-primary);
    }
    .tab-btn.active::after {
      content: '';
      position: absolute;
      bottom: -1px;
      left: 0;
      right: 0;
      height: 2px;
      background: var(--primary);
      border-radius: 2px 2px 0 0;
    }
    .tab-btn:hover:not(.active) { color: var(--text-primary); }

    .campaign-list { display: flex; flex-direction: column; gap: 16px; }
    .campaign-card { padding: 24px; }
    .campaign-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px; }
    .campaign-title { font-size: 18px; font-weight: 600; margin-bottom: 4px; }
    .campaign-meta { font-size: 13px; color: var(--text-secondary); display: flex; gap: 8px; align-items: center;}
    .campaign-desc { font-size: 14px; color: var(--text-tertiary); max-width: 800px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }

    .avatar { width: 44px; height: 44px; border-radius: 50%; object-fit: cover; border: 1px solid var(--border-weak); }
    .proposal-content {
      margin-top: 16px;
      padding-top: 16px;
      border-top: 1px solid var(--border-weak);
    }
    .proposal-actions {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
      margin-top: 16px;
    }

    .empty-state {
        text-align: center;
        padding: 80px 24px;
        background: var(--bg-card);
        border: 1px dashed var(--border-strong);
        border-radius: var(--radius-lg);
    }
    .empty-state-icon { font-size: 48px; color: var(--text-tertiary); margin-bottom: 16px; }
    .empty-state h3 { font-size: 20px; font-weight: 600; margin-bottom: 8px; }
    .empty-state p { color: var(--text-secondary); font-size: 15px; }
  `]
})
export class CampaignsComponent implements OnInit {
  campaigns = signal<Campaign[]>([]);
  proposals = signal<Application[]>([]);
  loading = signal(true);
  
  activeTab = signal<'campaigns' | 'proposals'>('campaigns');

  pendingCount = computed(() => {
    return this.proposals().filter(p => p.status === 'pending').length;
  });

  constructor(private campaignService: CampaignService) {}

  async ngOnInit() {
    await this.loadData();
  }

  async loadData() {
    this.loading.set(true);
    try {
      const [campaignData, proposalData] = await Promise.all([
        this.campaignService.getCampaigns(),
        this.campaignService.getBrandApplications()
      ]);
      this.campaigns.set(campaignData);
      this.proposals.set(proposalData);
    } catch (e) {
      console.error(e);
    } finally {
      this.loading.set(false);
    }
  }

  async updateStatus(id: string, status: 'accepted' | 'rejected') {
    try {
      await this.campaignService.updateApplicationStatus(id, status);
      // Optimistically update the UI
      this.proposals.update(current => 
        current.map(p => p.id === id ? { ...p, status } : p)
      );
    } catch (e) {
      console.error('Failed to update status', e);
    }
  }
}

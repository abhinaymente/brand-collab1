import { Component, OnInit, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CampaignService, Campaign } from '../../../core/services/campaign.service';

@Component({
  selector: 'app-campaigns',
  standalone: true,
  imports: [CommonModule, RouterLink, DatePipe],
  template: `
    <div class="campaigns-page animate-fade-up">
      <div class="page-header">
        <div>
          <h1 class="page-title">My Campaigns</h1>
          <p class="page-subtitle">Manage your influencer marketing campaigns</p>
        </div>
        <a routerLink="/dashboard/campaigns/new" class="btn btn-primary">
          <span style="font-size: 18px; margin-right: 4px">+</span> Create Campaign
        </a>
      </div>

      @if (loading()) {
        <div class="campaign-list">
          <div class="skeleton" style="height: 140px; border-radius: var(--radius-lg)"></div>
          <div class="skeleton" style="height: 140px; border-radius: var(--radius-lg)"></div>
        </div>
      } @else if (campaigns().length === 0) {
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
    </div>
  `,
  styles: [`
    .page-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 32px; }
    .page-title { font-size: 32px; font-weight: 700; letter-spacing: -0.02em; }
    .page-subtitle { color: var(--text-secondary); margin-top: 4px; font-size: 15px; }

    .campaign-list { display: flex; flex-direction: column; gap: 16px; }
    .campaign-card { padding: 24px; }
    .campaign-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px; }
    .campaign-title { font-size: 18px; font-weight: 600; margin-bottom: 4px; }
    .campaign-meta { font-size: 13px; color: var(--text-secondary); display: flex; gap: 8px; align-items: center;}
    .campaign-desc { font-size: 14px; color: var(--text-tertiary); max-width: 800px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }

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
  loading = signal(true);

  constructor(private campaignService: CampaignService) {}

  async ngOnInit() {
    try {
      const data = await this.campaignService.getCampaigns();
      this.campaigns.set(data);
    } catch (e) {
      console.error(e);
    } finally {
      this.loading.set(false);
    }
  }
}

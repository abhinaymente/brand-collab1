import { Component, OnInit, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CampaignService, Campaign } from '../../../core/services/campaign.service';

@Component({
  selector: 'app-find-work',
  standalone: true,
  imports: [CommonModule, DatePipe, FormsModule],
  template: `
    <div class="find-work-page animate-fade-up">
      <div class="page-header" style="margin-bottom: 32px;">
        <h1 class="page-title">Find Work</h1>
        <p class="page-subtitle">Browse active campaigns from top brands</p>
      </div>

      @if (loading()) {
         <div style="display:flex;flex-direction:column;gap:16px">
            <div class="skeleton" style="height:160px;border-radius:var(--radius-lg)"></div>
            <div class="skeleton" style="height:160px;border-radius:var(--radius-lg)"></div>
         </div>
      } @else if (campaigns().length === 0) {
          <div class="empty-state">
              <p>No active campaigns available at the moment.</p>
          </div>
      } @else {
          <div class="campaign-feed">
             @for (campaign of campaigns(); track campaign.id) {
                 <div class="glass-card campaign-card" [class.applying]="applyingTo() === campaign.id">
                    <div class="card-left">
                        <div class="campaign-brand">{{ campaign.profiles?.full_name ?? 'Brand' }}</div>
                        <h3 class="campaign-title">{{ campaign.title }}</h3>
                        <p class="campaign-desc">{{ campaign.description }}</p>
                        <div class="tags">
                            <span class="tag">₹{{ campaign.budget | number }}</span>
                            <span class="tag">{{ campaign.niche }}</span>
                            <span class="tag">Due: {{ campaign.deadline | date:'MMM d' }}</span>
                        </div>
                    </div>
                    
                    <div class="card-right">
                        @if (applyingTo() === campaign.id) {
                            <div class="apply-form animate-fade-in">
                                <h4>Submit Proposal</h4>
                                <textarea class="input-field" rows="3" placeholder="Why are you a good fit?" [(ngModel)]="proposalText"></textarea>
                                <input type="number" class="input-field" placeholder="Your Rate (₹)" [(ngModel)]="proposalRate" style="margin-top:8px">
                                <div style="display:flex;gap:8px;margin-top:12px">
                                    <button class="btn btn-primary btn-sm" (click)="submitApplication(campaign.id)">Send Proposal</button>
                                    <button class="btn btn-ghost btn-sm" (click)="applyingTo.set(null)">Cancel</button>
                                </div>
                            </div>
                        } @else {
                            <button class="btn btn-primary" (click)="startApplication(campaign.id)">Apply Now</button>
                        }
                    </div>
                 </div>
             }
          </div>
      }
    </div>
  `,
  styles: [`
    .page-title { font-size: 32px; font-weight: 700; letter-spacing: -0.02em; }
    .page-subtitle { color: var(--text-secondary); margin-top: 4px; font-size: 15px; }
    
    .campaign-feed { display: flex; flex-direction: column; gap: 20px; max-width: 900px; }
    .campaign-card { padding: 32px; display: flex; gap: 24px; transition: all var(--transition-base); }
    .campaign-card.applying { border-color: var(--border-accent); }
    
    .card-left { flex: 1; }
    .campaign-brand { font-size: 13px; font-weight: 600; color: var(--accent-blue); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px; }
    .campaign-title { font-size: 22px; font-weight: 700; margin-bottom: 8px; }
    .campaign-desc { font-size: 15px; color: var(--text-secondary); line-height: 1.6; margin-bottom: 16px; }
    
    .tags { display: flex; gap: 8px; }
    .tag { padding: 4px 10px; background: var(--bg-elevated); border: 1px solid var(--border); border-radius: var(--radius-sm); font-size: 12px; font-weight: 500; color: var(--text-tertiary); }
    
    .card-right { width: 300px; display: flex; align-items: flex-start; justify-content: flex-end; }
    
    .apply-form { width: 100%; }
    .apply-form h4 { font-size: 14px; margin-bottom: 12px; }
    
    @media (max-width: 768px) {
        .campaign-card { flex-direction: column; }
        .card-right { width: 100%; justify-content: flex-start; }
    }
  `]
})
export class FindWorkComponent implements OnInit {
  campaigns = signal<Campaign[]>([]);
  loading = signal(true);
  
  applyingTo = signal<string | null>(null);
  proposalText = '';
  proposalRate: number | null = null;

  constructor(private campaignService: CampaignService) {}

  async ngOnInit() {
    try {
      const data = await this.campaignService.getAllActiveCampaigns();
      this.campaigns.set(data);
    } catch(e) { console.error(e); }
    finally { this.loading.set(false); }
  }
  
  startApplication(id: string) {
      this.applyingTo.set(id);
      this.proposalText = '';
      this.proposalRate = null;
  }
  
  async submitApplication(campaignId: string) {
      if(!this.proposalText || !this.proposalRate) return;
      try {
          await this.campaignService.applyToCampaign(campaignId, this.proposalText, this.proposalRate);
          alert('Application submitted successfully!');
          this.applyingTo.set(null);
      } catch(e) {
          console.error(e);
          alert('Failed to submit application');
      }
  }
}

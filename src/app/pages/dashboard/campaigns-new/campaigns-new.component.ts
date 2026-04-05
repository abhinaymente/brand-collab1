import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { CampaignService } from '../../../core/services/campaign.service';

@Component({
  selector: 'app-campaigns-new',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="new-campaign-page animate-fade-up">
      <div class="page-header" style="margin-bottom: 32px;">
        <a routerLink="/dashboard/campaigns" class="back-link">← Back to Campaigns</a>
        <h1 class="page-title" style="margin-top: 16px;">Create New Campaign</h1>
      </div>

      <div class="glass-card form-card">
        <form (ngSubmit)="onSubmit()" class="campaign-form">
          <div class="input-group">
            <label class="input-label" for="title">Campaign Title</label>
            <input id="title" name="title" class="input-field" type="text" [(ngModel)]="campaign.title" required placeholder="e.g. Summer Tech Review">
          </div>

          <div class="input-group">
            <label class="input-label" for="niche">Niche / Category</label>
            <select id="niche" name="niche" class="input-field" [(ngModel)]="campaign.niche" required>
              <option value="" disabled selected>Select a niche...</option>
              <option value="Technology">Technology</option>
              <option value="Fashion">Fashion</option>
              <option value="Beauty">Beauty</option>
              <option value="Gaming">Gaming</option>
              <option value="Fitness">Fitness</option>
              <option value="Travel">Travel</option>
            </select>
          </div>

          <div class="grid-2">
            <div class="input-group">
              <label class="input-label" for="budget">Total Budget (₹)</label>
              <input id="budget" name="budget" class="input-field" type="number" [(ngModel)]="campaign.budget" required placeholder="50000">
            </div>
            <div class="input-group">
              <label class="input-label" for="deadline">Application Deadline</label>
              <input id="deadline" name="deadline" class="input-field" type="date" [(ngModel)]="campaign.deadline" required>
            </div>
          </div>

          <div class="input-group">
            <label class="input-label" for="description">Campaign Description & Requirements</label>
            <textarea id="description" name="description" class="input-field" rows="6" [(ngModel)]="campaign.description" required placeholder="Describe what you are looking for..."></textarea>
          </div>

           <div class="input-group">
            <label class="input-label" for="status">Initial Status</label>
            <select id="status" name="status" class="input-field" [(ngModel)]="campaign.status">
              <option value="draft">Save as Draft (Private)</option>
              <option value="active">Publish to Feed (Active)</option>
            </select>
          </div>

          @if (error()) {
            <div class="error-text">⚠ {{ error() }}</div>
          }

          <div class="form-actions">
            <a routerLink="/dashboard/campaigns" class="btn btn-secondary">Cancel</a>
            <button type="submit" class="btn btn-primary" [disabled]="loading()">
              {{ loading() ? 'Saving...' : 'Save Campaign' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .page-title { font-size: 32px; font-weight: 700; letter-spacing: -0.02em; }
    .back-link { font-size: 14px; color: var(--text-secondary); text-decoration: none; transition: color var(--transition-fast); }
    .back-link:hover { color: var(--text-primary); }
    
    .form-card { padding: 32px; max-width: 800px; }
    .campaign-form { display: flex; flex-direction: column; gap: 24px; }
    .form-actions { display: flex; gap: 16px; justify-content: flex-end; margin-top: 16px; padding-top: 24px; border-top: 1px solid var(--border); }
  `]
})
export class CampaignsNewComponent {
  campaign: any = {
    title: '',
    niche: '',
    budget: null,
    deadline: '',
    description: '',
    status: 'draft'
  };
  loading = signal(false);
  error = signal('');

  constructor(private campaignService: CampaignService, private router: Router) {}

  async onSubmit() {
    if (!this.campaign.title || !this.campaign.niche || !this.campaign.budget || !this.campaign.deadline || !this.campaign.description) {
      this.error.set('Please fill out all fields.');
      return;
    }
    
    this.loading.set(true);
    this.error.set('');
    
    try {
      await this.campaignService.createCampaign(this.campaign);
      this.router.navigate(['/dashboard/campaigns']);
    } catch (e: any) {
      this.error.set(e.message || 'Error saving campaign');
    } finally {
      this.loading.set(false);
    }
  }
}

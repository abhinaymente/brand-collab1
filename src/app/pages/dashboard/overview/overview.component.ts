import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampaignService } from '../../../core/services/campaign.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="overview-page animate-fade-up">
      <div class="page-header">
        <h1 class="page-title">Overview</h1>
        <p class="page-subtitle">Welcome back, {{ auth.profile()?.full_name?.split(' ')?.[0] ?? 'User' }}</p>
      </div>

      @if (loading()) {
        <div class="grid-4" style="margin-bottom: 24px">
          <div class="skeleton" style="height: 120px"></div>
          <div class="skeleton" style="height: 120px"></div>
          <div class="skeleton" style="height: 120px"></div>
          <div class="skeleton" style="height: 120px"></div>
        </div>
        <div class="grid-2">
          <div class="skeleton" style="height: 400px"></div>
          <div class="skeleton" style="height: 400px"></div>
        </div>
      } @else {
        <!-- Stats Row -->
        <div class="grid-4" style="margin-bottom: 24px">
          @if (auth.userRole() === 'brand') {
             <div class="stat-card">
              <div class="stat-label">Total Campaigns</div>
              <div class="stat-value">{{ stats()?.totalCampaigns ?? 0 }}</div>
              <div class="stat-trend trend-up">Active: {{ stats()?.activeCampaigns ?? 0 }}</div>
            </div>
             <div class="stat-card">
              <div class="stat-label">Total Applications</div>
              <div class="stat-value">{{ stats()?.totalApplications ?? 0 }}</div>
              <div class="stat-trend">Pending Review: {{ stats()?.pendingApplications ?? 0 }}</div>
            </div>
             <div class="stat-card">
              <div class="stat-label">Messages</div>
               <div class="stat-value">0</div>
             </div>
             <div class="stat-card">
               <div class="stat-label">Total Spent</div>
               <div class="stat-value">₹0</div>
             </div>
          } @else {
             <div class="stat-card">
               <div class="stat-label">Applications Sent</div>
               <div class="stat-value">{{ stats()?.totalApplications ?? 0 }}</div>
               <div class="stat-trend">Pending: {{ stats()?.pendingApplications ?? 0 }}</div>
             </div>
             <div class="stat-card">
               <div class="stat-label">Accepted Deals</div>
               <div class="stat-value">{{ stats()?.acceptedApplications ?? 0 }}</div>
             </div>
              <div class="stat-card">
              <div class="stat-label">Messages</div>
               <div class="stat-value">0</div>
             </div>
             <div class="stat-card">
               <div class="stat-label">Total Earned</div>
               <div class="stat-value">₹0</div>
             </div>
          }
        </div>

        <!-- Main Content Grid -->
        <div class="grid-2">
            <!-- Chart Area (Placeholder for structure) -->
            <div class="dashboard-panel">
                <h3 class="panel-title">Activity Timeline</h3>
                <div class="chart-placeholder">
                    <p style="color:var(--text-secondary)">Not enough data to display chart yet.</p>
                </div>
            </div>

            <!-- Recent Activity -->
             <div class="dashboard-panel">
                 <h3 class="panel-title">Recent Activity</h3>
                 @if ((stats()?.totalApplications ?? 0) > 0 || (stats()?.totalCampaigns ?? 0) > 0) {
                     <div class="activity-feed">
                          @if(auth.userRole() === 'brand') {
                             <div class="activity-item">
                                <span class="activity-dot"></span>
                                <div class="activity-content">
                                    <p>You have <strong>{{ stats()?.pendingApplications ?? 0 }}</strong> pending applications to review.</p>
                                    <span class="activity-time">Just now</span>
                                </div>
                             </div>
                             @if (stats()?.activeCampaigns > 0) {
                               <div class="activity-item">
                                 <span class="activity-dot" style="background:var(--accent-green)"></span>
                                 <div class="activity-content">
                                    <p><strong>{{ stats()?.activeCampaigns ?? 0 }}</strong> campaigns are currently active.</p>
                                    <span class="activity-time">Running</span>
                                </div>
                               </div>
                             }
                          } @else {
                             <div class="activity-item">
                                <span class="activity-dot"></span>
                                <div class="activity-content">
                                    <p>You have submitted <strong>{{ stats()?.totalApplications ?? 0 }}</strong> applications.</p>
                                    <span class="activity-time">Recently</span>
                                </div>
                             </div>
                          }
                     </div>
                 } @else {
                     <div class="empty-state">
                         <p>No recent activity.</p>
                     </div>
                 }
             </div>
        </div>
      }
    </div>
  `,
  styles: [`
    .page-header { margin-bottom: 32px; }
    .page-title { font-size: 32px; font-weight: 700; letter-spacing: -0.02em; }
    .page-subtitle { color: var(--text-secondary); margin-top: 4px; font-size: 15px; }

    .stat-card {
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: var(--radius-lg);
      padding: 24px;
    }
    .stat-label { font-size: 13px; color: var(--text-secondary); font-weight: 500; margin-bottom: 8px; }
    .stat-value { font-size: 32px; font-weight: 700; letter-spacing: -0.02em; color: var(--text-primary); }
    .stat-trend { font-size: 13px; color: var(--text-secondary); margin-top: 8px; font-weight: 500; }
    .trend-up { color: var(--accent-green); }

    .dashboard-panel {
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: var(--radius-lg);
      padding: 24px;
      min-height: 400px;
    }
    .panel-title { font-size: 18px; font-weight: 600; margin-bottom: 24px; letter-spacing: -0.01em; }

    .chart-placeholder {
      height: 240px;
      background: var(--bg-elevated);
      border-radius: var(--radius-md);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .activity-feed { display: flex; flex-direction: column; gap: 20px; }
    .activity-item { display: flex; gap: 16px; align-items: flex-start; }
    .activity-dot {
        width: 10px; height: 10px;
        background: var(--accent-blue);
        border-radius: 50%;
        margin-top: 6px;
        flex-shrink: 0;
    }
    .activity-content p { font-size: 14px; margin-bottom: 4px; }
    .activity-time { font-size: 12px; color: var(--text-secondary); }

    .empty-state {
        text-align: center;
        padding: 40px 0;
        color: var(--text-secondary);
        font-size: 14px;
    }
  `]
})
export class OverviewComponent implements OnInit {
  stats = signal<any>(null);
  loading = signal(true);

  constructor(public auth: AuthService, private campaignService: CampaignService) {}

  async ngOnInit() {
    try {
      const data = await this.campaignService.getDashboardStats();
      this.stats.set(data);
    } catch (e) {
      console.error(e);
    } finally {
      this.loading.set(false);
    }
  }
}

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent],
  template: `
    <div class="dashboard-shell">
      <app-sidebar></app-sidebar>
      <main class="dashboard-main">
        <div class="dashboard-content">
          <router-outlet></router-outlet>
        </div>
      </main>
    </div>
  `,
  styles: [`
    .dashboard-shell {
      display: flex;
      min-height: 100vh;
      background: var(--bg-primary);
    }
    .dashboard-main {
      flex: 1;
      margin-left: 240px;
      min-height: 100vh;
      overflow-x: hidden;
    }
    .dashboard-content {
      padding: 40px 40px;
      max-width: 1200px;
    }
    @media (max-width: 768px) {
      .dashboard-main { margin-left: 0; }
      .dashboard-content { padding: 20px 16px; }
    }
  `]
})
export class DashboardComponent {}

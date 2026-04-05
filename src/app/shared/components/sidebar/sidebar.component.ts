import { Component, computed } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  template: `
    <aside class="sidebar">
      <!-- Logo -->
      <div class="sidebar-header">
        <a routerLink="/" class="sidebar-logo">
          <span class="logo-mark">⬡</span>
          <span class="logo-text">Collab<span class="logo-dot">.io</span></span>
        </a>
      </div>

      <!-- Nav Links -->
      <nav class="sidebar-nav">
        <div class="nav-section">
          <span class="nav-section-label">{{ auth.userRole() === 'brand' ? 'Brand' : 'Creator' }}</span>
          @for (link of navLinks(); track link.href) {
            <a [routerLink]="link.href" routerLinkActive="sidebar-link-active" [routerLinkActiveOptions]="{exact: link.exact ?? false}" class="sidebar-link">
              <span class="sidebar-icon" [innerHTML]="link.icon"></span>
              <span class="sidebar-label">{{ link.label }}</span>
            </a>
          }
        </div>

        <div class="nav-section">
          <span class="nav-section-label">Account</span>
          <a routerLink="/dashboard/settings" routerLinkActive="sidebar-link-active" class="sidebar-link">
            <span class="sidebar-icon">⚙</span>
            <span class="sidebar-label">Settings</span>
          </a>
        </div>
      </nav>

      <!-- User Profile -->
      <div class="sidebar-footer">
        @if (auth.profile()) {
          <div class="user-card">
            <div class="user-avatar">
              {{ auth.profile()?.full_name ? auth.profile()?.full_name!.charAt(0).toUpperCase() : 'U' }}
            </div>
            <div class="user-info">
              <div class="user-name">{{ auth.profile()?.full_name }}</div>
              <div class="user-role">{{ auth.userRole() | titlecase }}</div>
            </div>
          </div>
        }
        <button class="btn btn-ghost btn-sm logout-btn" (click)="auth.signOut()">
          <span>⏻</span> Sign Out
        </button>
      </div>
    </aside>
  `,
  styles: [`
    .sidebar {
      width: 240px;
      height: 100vh;
      background: #0a0a0a;
      border-right: 1px solid var(--border);
      display: flex;
      flex-direction: column;
      position: fixed;
      left: 0;
      top: 0;
      z-index: 100;
      overflow-y: auto;
    }
    .sidebar-header {
      padding: 20px 20px 16px;
      border-bottom: 1px solid var(--border);
    }
    .sidebar-logo {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 18px;
      font-weight: 700;
      letter-spacing: -0.02em;
      text-decoration: none;
    }
    .logo-mark { color: var(--accent-blue); font-size: 20px; }
    .logo-text { color: var(--text-primary); }
    .logo-dot { color: var(--accent-blue); }
    .sidebar-nav {
      flex: 1;
      padding: 16px 12px;
      display: flex;
      flex-direction: column;
      gap: 24px;
    }
    .nav-section {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .nav-section-label {
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--text-tertiary);
      padding: 0 12px 8px;
    }
    .sidebar-link {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 12px;
      border-radius: var(--radius-sm);
      font-size: 14px;
      font-weight: 500;
      color: var(--text-secondary);
      text-decoration: none;
      transition: all var(--transition-fast);
      border-left: 2px solid transparent;
    }
    .sidebar-link:hover {
      background: var(--bg-glass);
      color: var(--text-primary);
    }
    .sidebar-link-active {
      background: rgba(10, 132, 255, 0.1);
      color: var(--accent-blue) !important;
      border-left-color: var(--accent-blue);
    }
    .sidebar-icon {
      width: 18px;
      text-align: center;
      font-size: 14px;
    }
    .sidebar-label { flex: 1; }
    .sidebar-footer {
      padding: 16px 12px;
      border-top: 1px solid var(--border);
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .user-card {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 12px;
      background: var(--bg-glass);
      border-radius: var(--radius-md);
      border: 1px solid var(--border);
    }
    .user-avatar {
      width: 32px;
      height: 32px;
      background: linear-gradient(135deg, var(--accent-blue), var(--accent-purple));
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 13px;
      font-weight: 700;
      color: white;
      flex-shrink: 0;
    }
    .user-info { min-width: 0; }
    .user-name {
      font-size: 13px;
      font-weight: 600;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: var(--text-primary);
    }
    .user-role {
      font-size: 11px;
      color: var(--text-secondary);
    }
    .logout-btn {
      width: 100%;
      justify-content: flex-start;
      gap: 8px;
      color: var(--text-secondary);
      font-size: 13px;
    }
    .logout-btn:hover { color: var(--accent-red); }
  `]
})
export class SidebarComponent {
  brandLinks = [
    { href: '/dashboard', label: 'Overview', icon: '▣', exact: true },
    { href: '/dashboard/campaigns', label: 'Campaigns', icon: '◈' },
    { href: '/dashboard/search', label: 'Discover Creators', icon: '⊕' },
    { href: '/dashboard/messages', label: 'Messages', icon: '◎' },
  ];

  influencerLinks = [
    { href: '/dashboard', label: 'Overview', icon: '▣', exact: true },
    { href: '/dashboard/find-work', label: 'Find Work', icon: '⊕' },
    { href: '/dashboard/profile', label: 'My Profile', icon: '◉' },
    { href: '/dashboard/messages', label: 'Messages', icon: '◎' },
  ];

  navLinks = computed(() =>
    this.auth.userRole() === 'brand' ? this.brandLinks : this.influencerLinks
  );

  constructor(public auth: AuthService) {}
}

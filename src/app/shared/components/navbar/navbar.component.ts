import { Component, HostListener, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  template: `
    <nav class="navbar" [class.scrolled]="isScrolled()">
      <div class="container">
        <div class="navbar-inner">
          <!-- Logo -->
          <a routerLink="/" class="navbar-logo">
            <span class="logo-mark">⬡</span>
            <span class="logo-text">Collab<span class="logo-dot">.io</span></span>
          </a>

          <!-- Desktop Nav -->
          <div class="navbar-links">
            <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}" class="nav-link">Home</a>
            <a routerLink="/dashboard/search" class="nav-link">Discover</a>
            <a routerLink="/dashboard/find-work" class="nav-link">Find Work</a>
          </div>

          <!-- Actions -->
          <div class="navbar-actions">
            @if (auth.isLoggedIn()) {
              <a routerLink="/dashboard" class="btn btn-secondary btn-sm">Dashboard</a>
              <button class="btn btn-ghost btn-sm" (click)="auth.signOut()">Sign Out</button>
            } @else {
              <a routerLink="/login" class="btn btn-ghost btn-sm">Log in</a>
              <a routerLink="/signup" class="btn btn-primary btn-sm">Get Started</a>
            }
          </div>

          <!-- Mobile Menu Toggle -->
          <button class="mobile-toggle" (click)="mobileOpen.set(!mobileOpen())">
            <span class="toggle-bar" [class.open]="mobileOpen()"></span>
            <span class="toggle-bar mid" [class.open]="mobileOpen()"></span>
            <span class="toggle-bar" [class.open]="mobileOpen()"></span>
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      @if (mobileOpen()) {
        <div class="mobile-menu animate-fade-in">
          <a routerLink="/" class="mobile-link" (click)="mobileOpen.set(false)">Home</a>
          <a routerLink="/dashboard/search" class="mobile-link" (click)="mobileOpen.set(false)">Discover</a>
          <a routerLink="/dashboard/find-work" class="mobile-link" (click)="mobileOpen.set(false)">Find Work</a>
          <hr class="divider" style="margin: 12px 0;">
          @if (auth.isLoggedIn()) {
            <a routerLink="/dashboard" class="mobile-link" (click)="mobileOpen.set(false)">Dashboard</a>
            <button class="mobile-link" style="text-align:left;width:100%;background:none;color:var(--accent-red)" (click)="auth.signOut()">Sign Out</button>
          } @else {
            <a routerLink="/login" class="mobile-link" (click)="mobileOpen.set(false)">Log in</a>
            <a routerLink="/signup" class="btn btn-primary" style="margin-top:8px;display:block;text-align:center" (click)="mobileOpen.set(false)">Get Started</a>
          }
        </div>
      }
    </nav>
  `,
  styles: [`
    .navbar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      background: rgba(0, 0, 0, 0.4);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-bottom: 1px solid transparent;
      transition: all 250ms ease;
    }
    .navbar.scrolled {
      background: rgba(0, 0, 0, 0.85);
      border-bottom-color: var(--border);
      box-shadow: 0 8px 32px rgba(0,0,0,0.4);
    }
    .navbar-inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 64px;
      gap: 24px;
    }
    .navbar-logo {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 20px;
      font-weight: 700;
      letter-spacing: -0.02em;
      text-decoration: none;
    }
    .logo-mark {
      color: var(--accent-blue);
      font-size: 22px;
    }
    .logo-text { color: var(--text-primary); }
    .logo-dot { color: var(--accent-blue); }
    .navbar-links {
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .nav-link {
      padding: 6px 14px;
      border-radius: var(--radius-full);
      font-size: 14px;
      font-weight: 500;
      color: var(--text-secondary);
      text-decoration: none;
      transition: all var(--transition-fast);
    }
    .nav-link:hover, .nav-link.active {
      color: var(--text-primary);
      background: rgba(255,255,255,0.06);
    }
    .navbar-actions {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .mobile-toggle {
      display: none;
      flex-direction: column;
      gap: 5px;
      width: 28px;
      background: transparent;
      cursor: pointer;
      padding: 4px;
    }
    .toggle-bar {
      height: 2px;
      background: var(--text-primary);
      border-radius: 1px;
      transition: all 0.3s ease;
      display: block;
      width: 100%;
    }
    .toggle-bar.mid.open { opacity: 0; }
    .mobile-menu {
      background: var(--bg-card);
      border-top: 1px solid var(--border);
      padding: 16px 24px 24px;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .mobile-link {
      display: block;
      padding: 12px 8px;
      font-size: 16px;
      font-weight: 500;
      color: var(--text-primary);
      text-decoration: none;
      border-radius: var(--radius-sm);
      transition: background var(--transition-fast);
      background: none;
      border: none;
      cursor: pointer;
    }
    .mobile-link:hover { background: var(--bg-glass); }

    @media (max-width: 768px) {
      .navbar-links, .navbar-actions { display: none; }
      .mobile-toggle { display: flex; }
    }
  `]
})
export class NavbarComponent {
  isScrolled = signal(false);
  mobileOpen = signal(false);

  constructor(public auth: AuthService) {}

  @HostListener('window:scroll')
  onScroll() {
    this.isScrolled.set(window.scrollY > 20);
  }
}

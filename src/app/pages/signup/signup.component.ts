import { Component, signal } from '@angular/core';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  template: `
    <div class="auth-layout">
      <!-- Left Panel -->
      <div class="auth-left">
        <div class="auth-left-inner">
          <a routerLink="/" class="sidebar-logo">
            <span style="color:var(--accent-blue);font-size:24px">⬡</span>
            <span style="font-size:22px;font-weight:700;letter-spacing:-0.02em">Collab<span style="color:var(--accent-blue)">.io</span></span>
          </a>

          <div class="auth-left-content">
            <h2 class="text-display">Start<br>collaborating.</h2>
            <p style="color:var(--text-secondary);font-size:18px;margin-top:16px;line-height:1.6">Join the platform where the best brands and most creative minds meet.</p>

            <div class="perks-list">
              <div class="perk-item">
                <span class="perk-icon">✓</span>
                Free to get started — no credit card needed
              </div>
              <div class="perk-item">
                <span class="perk-icon">✓</span>
                Secure escrow payments built-in
              </div>
              <div class="perk-item">
                <span class="perk-icon">✓</span>
                Direct messaging with brands & creators
              </div>
              <div class="perk-item">
                <span class="perk-icon">✓</span>
                Real-time campaign analytics dashboard
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Panel -->
      <div class="auth-right">
        <div class="auth-form-wrapper animate-scale-in">
          <div class="auth-form-header">
            <h1 class="auth-title">Create account</h1>
            <p class="auth-subtitle">Start your journey on Collab.io</p>
          </div>

          <!-- Role Toggle -->
          <div class="role-toggle">
            <button
              class="role-btn"
              [class.role-active]="role() === 'brand'"
              (click)="role.set('brand')"
            >
              🏢 Brand
            </button>
            <button
              class="role-btn"
              [class.role-active]="role() === 'influencer'"
              (click)="role.set('influencer')"
            >
              🎨 Creator
            </button>
          </div>

          <form class="auth-form" (ngSubmit)="onSubmit()">
            @if (error()) {
              <div class="auth-error animate-fade-in">
                ⚠ {{ error() }}
              </div>
            }
            @if (success()) {
              <div class="auth-success animate-fade-in">
                ✓ Account created! Redirecting to dashboard...
              </div>
            }

            <div class="input-group">
              <label class="input-label" for="fullName">
                {{ role() === 'brand' ? 'Company Name' : 'Full Name' }}
              </label>
              <input
                id="fullName"
                class="input-field"
                type="text"
                [placeholder]="role() === 'brand' ? 'Acme Corp.' : 'Jane Doe'"
                [(ngModel)]="fullName"
                name="fullName"
                required
              >
            </div>

            <div class="input-group">
              <label class="input-label" for="email">Work Email</label>
              <input
                id="email"
                class="input-field"
                type="email"
                placeholder="you@company.com"
                [(ngModel)]="email"
                name="email"
                required
                autocomplete="email"
              >
            </div>

            <div class="input-group">
              <label class="input-label" for="password">Password</label>
              <input
                id="password"
                class="input-field"
                type="password"
                placeholder="Min. 8 characters"
                [(ngModel)]="password"
                name="password"
                required
                autocomplete="new-password"
                minlength="8"
              >
            </div>

            <button
              type="submit"
              class="btn btn-primary"
              style="width:100%;justify-content:center;margin-top:8px"
              [disabled]="loading()"
            >
              @if (loading()) {
                <span class="spinner"></span> Creating account...
              } @else {
                Create Account →
              }
            </button>
          </form>

          <p class="auth-switch">
            Already have an account?
            <a routerLink="/login" style="color:var(--accent-blue);font-weight:600">Sign in</a>
          </p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .auth-layout {
      min-height: 100vh;
      display: grid;
      grid-template-columns: 1fr 1fr;
    }
    .auth-left {
      background: var(--bg-card);
      border-right: 1px solid var(--border);
      display: flex;
      align-items: stretch;
    }
    .auth-left-inner {
      padding: 40px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 100%;
    }
    .sidebar-logo {
      display: flex;
      align-items: center;
      gap: 8px;
      text-decoration: none;
    }
    .auth-left-content { flex: 1; display: flex; flex-direction: column; justify-content: center; }
    .perks-list {
      margin-top: 32px;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .perk-item {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 15px;
      color: var(--text-secondary);
    }
    .perk-icon {
      width: 22px; height: 22px;
      background: rgba(48, 209, 88, 0.15);
      color: var(--accent-green);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      font-weight: 700;
      flex-shrink: 0;
    }
    .auth-right {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 40px 24px;
      background: var(--bg-primary);
    }
    .auth-form-wrapper { width: 100%; max-width: 400px; }
    .auth-form-header { margin-bottom: 28px; }
    .auth-title { font-size: 32px; font-weight: 800; letter-spacing: -0.02em; }
    .auth-subtitle { color: var(--text-secondary); margin-top: 8px; font-size: 15px; }
    .role-toggle {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
      background: var(--bg-elevated);
      border: 1px solid var(--border);
      border-radius: var(--radius-md);
      padding: 6px;
      margin-bottom: 24px;
    }
    .role-btn {
      padding: 10px;
      border-radius: var(--radius-sm);
      font-size: 14px;
      font-weight: 600;
      color: var(--text-secondary);
      background: transparent;
      border: none;
      cursor: pointer;
      transition: all var(--transition-fast);
    }
    .role-active {
      background: var(--accent-blue) !important;
      color: white !important;
      box-shadow: 0 2px 8px rgba(10,132,255,0.3);
    }
    .auth-form { display: flex; flex-direction: column; gap: 20px; }
    .auth-error {
      background: rgba(255, 69, 58, 0.1);
      border: 1px solid rgba(255, 69, 58, 0.25);
      border-radius: var(--radius-md);
      padding: 12px 16px;
      font-size: 14px;
      color: var(--accent-red);
    }
    .auth-success {
      background: rgba(48, 209, 88, 0.1);
      border: 1px solid rgba(48, 209, 88, 0.25);
      border-radius: var(--radius-md);
      padding: 12px 16px;
      font-size: 14px;
      color: var(--accent-green);
    }
    .auth-switch {
      text-align: center;
      margin-top: 24px;
      font-size: 14px;
      color: var(--text-secondary);
    }
    .spinner {
      width: 16px; height: 16px;
      border: 2px solid rgba(255,255,255,0.3);
      border-top-color: white;
      border-radius: 50%;
      animation: spin 0.6s linear infinite;
      display: inline-block;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
    button:disabled { opacity: 0.7; cursor: not-allowed; }
    @media (max-width: 768px) {
      .auth-layout { grid-template-columns: 1fr; }
      .auth-left { display: none; }
    }
  `]
})
export class SignupComponent {
  fullName = '';
  email = '';
  password = '';
  role = signal<'brand' | 'influencer'>('brand');
  loading = signal(false);
  error = signal('');
  success = signal(false);

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    const roleParam = this.route.snapshot.queryParamMap.get('role');
    if (roleParam === 'influencer') this.role.set('influencer');
  }

  async onSubmit() {
    if (!this.fullName || !this.email || !this.password) {
      this.error.set('Please fill in all fields.');
      return;
    }
    if (this.password.length < 8) {
      this.error.set('Password must be at least 8 characters.');
      return;
    }
    this.loading.set(true);
    this.error.set('');
    try {
      await this.auth.signUp(this.email, this.password, this.fullName, this.role());
      this.success.set(true);
      setTimeout(() => this.router.navigate(['/dashboard']), 1500);
    } catch (err: any) {
      this.error.set(err.message ?? 'Signup failed. Please try again.');
    } finally {
      this.loading.set(false);
    }
  }
}

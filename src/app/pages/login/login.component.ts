import { Component, signal } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, NavbarComponent],
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
            <h2 class="text-display">Welcome<br>back.</h2>
            <p style="color:var(--text-secondary);font-size:18px;margin-top:16px;line-height:1.6">Your campaigns and creator relationships are waiting.</p>
          </div>

        </div>
      </div>

      <!-- Right Panel -->
      <div class="auth-right">
        <div class="auth-form-wrapper animate-scale-in">
          <div class="auth-form-header">
            <h1 class="auth-title">Sign in</h1>
            <p class="auth-subtitle">Enter your credentials to continue</p>
          </div>

          <form class="auth-form" (ngSubmit)="onSubmit()">
            @if (error()) {
              <div class="auth-error animate-fade-in">
                ⚠ {{ error() }}
              </div>
            }

            <div class="input-group">
              <label class="input-label" for="email">Email address</label>
              <input
                id="email"
                class="input-field"
                type="email"
                placeholder="you@example.com"
                [(ngModel)]="email"
                name="email"
                required
                autocomplete="email"
              >
            </div>

            <div class="input-group">
              <label class="input-label" for="password">
                Password
                <a href="#" class="forgot-link">Forgot?</a>
              </label>
              <input
                id="password"
                class="input-field"
                type="password"
                placeholder="••••••••"
                [(ngModel)]="password"
                name="password"
                required
                autocomplete="current-password"
              >
            </div>

            <button
              type="submit"
              class="btn btn-primary"
              style="width:100%;justify-content:center;margin-top:8px"
              [disabled]="loading()"
            >
              @if (loading()) {
                <span class="spinner"></span> Signing in...
              } @else {
                Sign in →
              }
            </button>
          </form>

          <p class="auth-switch">
            Don't have an account?
            <a routerLink="/signup" style="color:var(--accent-blue);font-weight:600">Create one</a>
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
    .auth-testimonial {
      background: var(--bg-glass);
      border: 1px solid var(--border);
      border-radius: var(--radius-lg);
      padding: 24px;
    }
    .testimonial-text {
      font-size: 15px;
      color: var(--text-primary);
      line-height: 1.7;
      font-style: italic;
      margin-bottom: 16px;
    }
    .testimonial-author {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .testimonial-avatar {
      width: 36px; height: 36px;
      background: linear-gradient(135deg, var(--accent-blue), var(--accent-purple));
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
    .auth-form-wrapper {
      width: 100%;
      max-width: 400px;
    }
    .auth-form-header { margin-bottom: 32px; }
    .auth-title { font-size: 32px; font-weight: 800; letter-spacing: -0.02em; }
    .auth-subtitle { color: var(--text-secondary); margin-top: 8px; font-size: 15px; }
    .auth-form { display: flex; flex-direction: column; gap: 20px; }
    .auth-error {
      background: rgba(255, 69, 58, 0.1);
      border: 1px solid rgba(255, 69, 58, 0.25);
      border-radius: var(--radius-md);
      padding: 12px 16px;
      font-size: 14px;
      color: var(--accent-red);
    }
    .input-label {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .forgot-link {
      font-size: 13px;
      color: var(--accent-blue);
      text-decoration: none;
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
export class LoginComponent {
  email = '';
  password = '';
  loading = signal(false);
  error = signal('');

  constructor(private auth: AuthService, private router: Router) {}

  async onSubmit() {
    if (!this.email || !this.password) {
      this.error.set('Please fill in all fields.');
      return;
    }
    this.loading.set(true);
    this.error.set('');
    try {
      await this.auth.signIn(this.email, this.password);
      this.router.navigate(['/dashboard']);
    } catch (err: any) {
      this.error.set(err.message ?? 'Invalid credentials. Please try again.');
    } finally {
      this.loading.set(false);
    }
  }
}

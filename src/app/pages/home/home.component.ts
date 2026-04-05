import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, NavbarComponent],
  template: `
    <div class="home-page">
      <app-navbar></app-navbar>

      <!-- Hero Section -->
      <section class="hero">
        <div class="hero-bg">
          <div class="hero-orb orb-1"></div>
          <div class="hero-orb orb-2"></div>
          <div class="hero-grid"></div>
        </div>

        <div class="container">
          <div class="hero-content">
            <div class="hero-badge animate-fade-up delay-1">
              <span class="badge-dot"></span>
              Trusted by 500+ brands worldwide
            </div>

            <h1 class="text-hero animate-fade-up delay-2">
              Where Top Brands<br>
              Meet <span class="text-gradient">Elite Creators</span>
            </h1>

            <p class="hero-description animate-fade-up delay-3">
              The premium platform for secure, high-impact influencer collaborations.
              Streamline your workflow from discovery to payment.
            </p>

            <div class="hero-cta animate-fade-up delay-4">
              <a routerLink="/signup" [queryParams]="{role: 'brand'}" class="btn btn-primary btn-lg">
                I'm a Brand
                <span class="btn-arrow">→</span>
              </a>
              <a routerLink="/signup" [queryParams]="{role: 'influencer'}" class="btn btn-secondary btn-lg">
                I'm a Creator
              </a>
            </div>

            <div class="hero-stats animate-fade-up delay-5">
              <div class="stat-item">
                <span class="stat-value">₹2.4Cr+</span>
                <span class="stat-label">Deals Closed</span>
              </div>
              <div class="stat-divider"></div>
              <div class="stat-item">
                <span class="stat-value">12K+</span>
                <span class="stat-label">Creators</span>
              </div>
              <div class="stat-divider"></div>
              <div class="stat-item">
                <span class="stat-value">500+</span>
                <span class="stat-label">Brands</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section class="section features-section">
        <div class="container">
          <div class="section-header">
            <span class="text-label" style="color: var(--accent-blue)">Why Collab.io</span>
            <h2 class="text-display" style="margin-top:12px">Built for the future<br>of brand marketing</h2>
          </div>

          <div class="grid-3 features-grid">
            <div class="glass-card feature-card">
              <div class="feature-icon blue">
                <span>⬡</span>
              </div>
              <h3 class="feature-title">Smart Matching</h3>
              <p class="feature-desc">AI-powered discovery engine finds the perfect creator for your niche, audience size, and budget — in seconds.</p>
            </div>

            <div class="glass-card feature-card">
              <div class="feature-icon green">
                <span>◈</span>
              </div>
              <h3 class="feature-title">Secure Escrow</h3>
              <p class="feature-desc">Payments are held safely in escrow until deliverables are approved. Zero financial risk on both sides.</p>
            </div>

            <div class="glass-card feature-card">
              <div class="feature-icon purple">
                <span>◉</span>
              </div>
              <h3 class="feature-title">Real-time Analytics</h3>
              <p class="feature-desc">Track campaign performance, engagement rates, and ROI directly from your dashboard. Data-driven decisions, always.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- How It Works -->
      <section class="section how-section">
        <div class="container">
          <div class="section-header">
            <span class="text-label" style="color: var(--accent-green)">How It Works</span>
            <h2 class="text-display" style="margin-top:12px">Launch a campaign<br>in three steps</h2>
          </div>

          <div class="steps-grid">
            <div class="step-card">
              <div class="step-num">01</div>
              <h3 class="step-title">Create Your Profile</h3>
              <p class="step-desc">Sign up as a Brand or Creator. Set your niche, audience, and collaboration preferences in minutes.</p>
            </div>
            <div class="step-connector"></div>
            <div class="step-card">
              <div class="step-num">02</div>
              <h3 class="step-title">Browse & Connect</h3>
              <p class="step-desc">Brands post campaigns. Creators apply with proposals. Smart matching surfaces the best fits instantly.</p>
            </div>
            <div class="step-connector"></div>
            <div class="step-card">
              <div class="step-num">03</div>
              <h3 class="step-title">Collaborate & Get Paid</h3>
              <p class="step-desc">Manage deliverables, communicate in-app, and receive secure payments — all in one place.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Banner -->
      <section class="section-sm cta-section">
        <div class="container">
          <div class="cta-card">
            <div class="cta-glow"></div>
            <h2 class="text-display" style="text-align:center">Ready to start<br><span class="text-gradient">collaborating?</span></h2>
            <p class="cta-desc">Join thousands of brands and creators already building the future of marketing together.</p>
            <div class="cta-buttons">
              <a routerLink="/signup" class="btn btn-primary btn-lg">Create Free Account</a>
              <a routerLink="/login" class="btn btn-ghost btn-lg">Sign In →</a>
            </div>
          </div>
        </div>
      </section>

      <!-- Footer -->
      <footer class="footer">
        <div class="container">
          <div class="footer-inner">
            <div class="footer-brand">
              <span class="logo-mark">⬡</span>
              <span class="footer-logo-text">Collab.io</span>
            </div>
            <p class="footer-copy">© 2025 Collab.io · Built by Abhinay Mente</p>
            <div class="footer-links">
              <a href="#" class="footer-link">Privacy</a>
              <a href="#" class="footer-link">Terms</a>
              <a href="#" class="footer-link">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  `,
  styles: [`
    .home-page { min-height: 100vh; }

    /* Hero */
    .hero {
      position: relative;
      min-height: 100vh;
      display: flex;
      align-items: center;
      overflow: hidden;
      padding-top: 64px;
    }
    .hero-bg {
      position: absolute;
      inset: 0;
      pointer-events: none;
    }
    .hero-orb {
      position: absolute;
      border-radius: 50%;
      filter: blur(80px);
      opacity: 0.3;
    }
    .orb-1 {
      width: 600px; height: 600px;
      background: radial-gradient(circle, var(--accent-blue) 0%, transparent 70%);
      top: -200px; right: -100px;
    }
    .orb-2 {
      width: 400px; height: 400px;
      background: radial-gradient(circle, var(--accent-purple) 0%, transparent 70%);
      bottom: -100px; left: -50px;
    }
    .hero-grid {
      position: absolute;
      inset: 0;
      background-image:
        linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
      background-size: 50px 50px;
      mask-image: radial-gradient(ellipse at center, black 30%, transparent 80%);
    }
    .hero-content {
      position: relative;
      z-index: 1;
      max-width: 760px;
      margin: 0 auto;
      text-align: center;
      padding: 80px 0;
    }
    .hero-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 8px 16px;
      background: rgba(10, 132, 255, 0.1);
      border: 1px solid rgba(10, 132, 255, 0.25);
      border-radius: var(--radius-full);
      font-size: 13px;
      font-weight: 500;
      color: var(--accent-blue);
      margin-bottom: 32px;
    }
    .badge-dot {
      width: 6px; height: 6px;
      background: var(--accent-green);
      border-radius: 50%;
      animation: pulse-glow 2s infinite;
    }
    .hero-description {
      font-size: 20px;
      color: var(--text-secondary);
      max-width: 560px;
      margin: 24px auto 40px;
      line-height: 1.6;
    }
    .hero-cta {
      display: flex;
      gap: 16px;
      justify-content: center;
      flex-wrap: wrap;
      margin-bottom: 56px;
    }
    .btn-arrow {
      transition: transform var(--transition-fast);
    }
    .btn-primary:hover .btn-arrow {
      transform: translateX(4px);
    }
    .hero-stats {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 32px;
      padding: 24px 32px;
      background: var(--bg-glass);
      border: 1px solid var(--border);
      border-radius: var(--radius-xl);
      backdrop-filter: blur(10px);
      flex-wrap: wrap;
    }
    .stat-item { text-align: center; }
    .stat-value {
      display: block;
      font-size: 28px;
      font-weight: 800;
      letter-spacing: -0.02em;
      background: linear-gradient(135deg, #fff 0%, var(--accent-blue) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .stat-label {
      display: block;
      font-size: 12px;
      color: var(--text-secondary);
      margin-top: 2px;
    }
    .stat-divider {
      width: 1px;
      height: 36px;
      background: var(--border);
    }

    /* Features */
    .features-section { background: var(--bg-secondary); }
    .section-header {
      text-align: center;
      margin-bottom: 64px;
    }
    .feature-card {
      padding: 36px;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .feature-icon {
      width: 52px; height: 52px;
      border-radius: var(--radius-md);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 22px;
    }
    .feature-icon.blue { background: rgba(10,132,255,0.15); color: var(--accent-blue); }
    .feature-icon.green { background: rgba(48,209,88,0.15); color: var(--accent-green); }
    .feature-icon.purple { background: rgba(191,90,242,0.15); color: var(--accent-purple); }
    .feature-title { font-size: 20px; font-weight: 700; letter-spacing: -0.01em; }
    .feature-desc { font-size: 15px; color: var(--text-secondary); line-height: 1.6; }

    /* How It Works */
    .steps-grid {
      display: flex;
      align-items: center;
      gap: 0;
      max-width: 900px;
      margin: 0 auto;
    }
    .step-card {
      flex: 1;
      padding: 36px 24px;
      text-align: center;
    }
    .step-num {
      font-size: 48px;
      font-weight: 900;
      letter-spacing: -0.04em;
      background: linear-gradient(135deg, var(--accent-blue) 0%, transparent 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      line-height: 1;
      margin-bottom: 16px;
    }
    .step-title { font-size: 20px; font-weight: 700; margin-bottom: 12px; }
    .step-desc { font-size: 14px; color: var(--text-secondary); line-height: 1.6; }
    .step-connector {
      width: 60px;
      height: 1px;
      background: linear-gradient(90deg, var(--accent-blue), var(--border));
      flex-shrink: 0;
    }

    @media (max-width: 768px) {
      .steps-grid { flex-direction: column; }
      .step-connector { width: 1px; height: 40px; }
    }

    /* CTA */
    .cta-section { background: var(--bg-secondary); }
    .cta-card {
      position: relative;
      padding: 80px 40px;
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: var(--radius-xl);
      text-align: center;
      overflow: hidden;
    }
    .cta-glow {
      position: absolute;
      top: -80px;
      left: 50%;
      transform: translateX(-50%);
      width: 400px;
      height: 200px;
      background: radial-gradient(ellipse, rgba(10,132,255,0.2) 0%, transparent 70%);
      pointer-events: none;
    }
    .cta-desc {
      font-size: 18px;
      color: var(--text-secondary);
      margin: 20px auto 40px;
      max-width: 480px;
    }
    .cta-buttons {
      display: flex;
      gap: 16px;
      justify-content: center;
      flex-wrap: wrap;
    }

    /* Footer */
    .footer {
      border-top: 1px solid var(--border);
      padding: 32px 0;
    }
    .footer-inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      flex-wrap: wrap;
    }
    .footer-brand {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 16px;
      font-weight: 700;
    }
    .logo-mark { color: var(--accent-blue); }
    .footer-logo-text { color: var(--text-primary); }
    .footer-copy { font-size: 13px; color: var(--text-secondary); }
    .footer-links { display: flex; gap: 20px; }
    .footer-link { font-size: 13px; color: var(--text-secondary); transition: color var(--transition-fast); }
    .footer-link:hover { color: var(--text-primary); }

    @media (max-width: 600px) {
      .footer-inner { flex-direction: column; text-align: center; }
    }
  `]
})
export class HomeComponent {}

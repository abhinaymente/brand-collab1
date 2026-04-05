import { Component } from '@angular/core';

@Component({
  selector: 'app-settings',
  standalone: true,
  template: `
    <div class="animate-fade-up">
       <div class="page-header" style="margin-bottom: 32px;">
        <h1 class="page-title">Settings</h1>
        <p class="page-subtitle">Manage your account preferences</p>
      </div>
      
      <div class="glass-card" style="padding: 40px; text-align: center;">
          <h3 style="font-size: 24px; margin-bottom: 12px;">General Settings</h3>
          <p style="color: var(--text-secondary)">More settings options will be available soon.</p>
      </div>
    </div>
  `,
  styles: [`
    .page-title { font-size: 32px; font-weight: 700; letter-spacing: -0.02em; }
    .page-subtitle { color: var(--text-secondary); margin-top: 4px; font-size: 15px; }
  `]
})
export class SettingsComponent {}

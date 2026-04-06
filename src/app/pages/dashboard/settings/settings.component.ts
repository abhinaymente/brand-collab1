import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService, Profile } from '../../../core/services/auth.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="settings-page animate-fade-up">
      <div class="page-header" style="margin-bottom: 32px;">
        <h1 class="page-title">Settings</h1>
        <p class="page-subtitle">Manage your account and profile preferences</p>
      </div>

      <div class="settings-layout">
        <aside class="settings-nav glass-card">
          <button 
            class="nav-tab" 
            [class.active]="activeTab() === 'profile'" 
            (click)="activeTab.set('profile')">
             <span class="icon">👤</span> Profile
          </button>
          <button 
            class="nav-tab" 
            [class.active]="activeTab() === 'account'" 
            (click)="activeTab.set('account')">
             <span class="icon">⚙️</span> Account
          </button>
          <button 
            class="nav-tab" 
            [class.active]="activeTab() === 'notifications'" 
            (click)="activeTab.set('notifications')">
             <span class="icon">🔔</span> Notifications
          </button>
        </aside>

        <main class="settings-content glass-card">
          @if (activeTab() === 'profile') {
            <div class="section-header">
              <h2 class="section-title">Public Profile</h2>
              <p class="section-desc">Manage how others see you on the platform.</p>
            </div>

            <form (ngSubmit)="saveProfile()" #profileForm="ngForm" class="settings-form">
              <div class="form-group">
                <label class="label">Avatar URL</label>
                <div class="avatar-preview-row">
                  <img [src]="profileFormModel.avatar_url || 'assets/default-avatar.png'" class="avatar-lg" alt="Avatar" />
                  <input 
                    type="text" 
                    class="input" 
                    name="avatar_url" 
                    [(ngModel)]="profileFormModel.avatar_url" 
                    placeholder="https://example.com/avatar.jpg" />
                </div>
              </div>

              <div class="form-group">
                <label class="label">Full Name</label>
                <input 
                  type="text" 
                  class="input" 
                  name="full_name" 
                  [(ngModel)]="profileFormModel.full_name" 
                  required />
              </div>

              <div class="form-group">
                <label class="label">Bio</label>
                <textarea 
                  class="input textarea" 
                  name="bio" 
                  rows="4" 
                  [(ngModel)]="profileFormModel.bio" 
                  placeholder="Tell us about yourself..."></textarea>
              </div>

              <div class="form-actions">
                @if (statusMessage()) {
                    <span class="status-msg" [class.error]="isError()">{{ statusMessage() }}</span>
                }
                <button type="submit" class="btn btn-primary" [disabled]="saving()">
                  {{ saving() ? 'Saving...' : 'Save Changes' }}
                </button>
              </div>
            </form>
          } @else if (activeTab() === 'account') {
             <div class="section-header">
              <h2 class="section-title">Account Settings</h2>
              <p class="section-desc">Manage your account security and preferences.</p>
            </div>
            
            <div class="mock-settings">
                <div class="setting-item">
                    <div class="setting-text">
                        <h4>Two-Factor Authentication</h4>
                        <p>Add an extra layer of security to your account.</p>
                    </div>
                    <button class="btn btn-outline btn-sm">Enable</button>
                </div>
                <div class="setting-item">
                    <div class="setting-text">
                        <h4>Delete Account</h4>
                        <p>Permanently remove your account and all data.</p>
                    </div>
                    <button class="btn btn-danger btn-sm">Delete</button>
                </div>
            </div>
          } @else if (activeTab() === 'notifications') {
             <div class="section-header">
              <h2 class="section-title">Notifications</h2>
              <p class="section-desc">Decide which alerts you want to receive.</p>
            </div>
            
             <div class="mock-settings">
                <div class="setting-item">
                    <div class="setting-text">
                        <h4>Email Notifications</h4>
                        <p>Receive updates about new campaigns and messages via email.</p>
                    </div>
                    <input type="checkbox" checked />
                </div>
                <div class="setting-item">
                    <div class="setting-text">
                        <h4>Push Notifications</h4>
                        <p>Get real-time browser alerts when you receive a proposal.</p>
                    </div>
                    <input type="checkbox" checked />
                </div>
            </div>
          }
        </main>
      </div>
    </div>
  `,
  styles: [`
    .settings-page { max-width: 1000px; margin: 0 auto; }
    .page-title { font-size: 32px; font-weight: 700; letter-spacing: -0.02em; }
    .page-subtitle { color: var(--text-secondary); margin-top: 4px; font-size: 15px; }

    .settings-layout {
      display: grid;
      grid-template-columns: 240px 1fr;
      gap: 32px;
      margin-top: 32px;
    }

    .settings-nav {
      padding: 16px;
      height: fit-content;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .nav-tab {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 16px;
      background: none;
      border: none;
      color: var(--text-secondary);
      font-size: 15px;
      font-weight: 500;
      border-radius: var(--radius-md);
      cursor: pointer;
      transition: all 0.2s;
    }
    .nav-tab:hover {
      background: rgba(255,255,255,0.05);
      color: var(--text-primary);
    }
    .nav-tab.active {
      background: rgba(var(--primary-rgb, 99, 102, 241), 0.1);
      color: var(--primary);
    }
    .nav-tab .icon { font-size: 18px; }

    .settings-content {
      padding: 32px;
    }
    .section-header { margin-bottom: 32px; padding-bottom: 24px; border-bottom: 1px solid var(--border-weak); }
    .section-title { font-size: 20px; font-weight: 600; margin-bottom: 8px; }
    .section-desc { color: var(--text-secondary); font-size: 14px; }

    .settings-form { display: flex; flex-direction: column; gap: 24px; }
    .form-group { display: flex; flex-direction: column; gap: 8px; }
    .label { font-size: 14px; font-weight: 600; color: var(--text-secondary); }
    
    .avatar-preview-row { display: flex; align-items: center; gap: 20px; }
    .avatar-lg { width: 80px; height: 80px; border-radius: 50%; object-fit: cover; border: 2px solid var(--border-weak); }
    
    .textarea { resize: vertical; min-height: 120px; }

    .form-actions {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      gap: 16px;
      margin-top: 16px;
    }
    .status-msg { font-size: 14px; color: #10b981; }
    .status-msg.error { color: #ef4444; }

    .mock-settings { display: flex; flex-direction: column; gap: 16px; }
    .setting-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px;
        background: rgba(255,255,255,0.02);
        border: 1px solid var(--border-weak);
        border-radius: var(--radius-lg);
    }
    .setting-text h4 { font-size: 16px; font-weight: 600; margin-bottom: 4px; }
    .setting-text p { font-size: 13px; color: var(--text-tertiary); margin: 0; }

    .btn-danger { background: rgba(239, 68, 68, 0.1); color: #ef4444; border: 1px solid rgba(239, 68, 68, 0.2); }
    .btn-danger:hover { background: #ef4444; color: white; }
    .btn-sm { padding: 8px 16px; font-size: 13px; }
  `]
})
export class SettingsComponent implements OnInit {
  activeTab = signal<'profile' | 'account' | 'notifications'>('profile');
  profileFormModel: Partial<Profile> = {};
  saving = signal(false);
  statusMessage = signal('');
  isError = signal(false);

  constructor(private authService: AuthService) {}

  ngOnInit() {
    const currentProfile = this.authService.profile();
    if (currentProfile) {
      this.profileFormModel = {
        full_name: currentProfile.full_name,
        bio: currentProfile.bio || '',
        avatar_url: currentProfile.avatar_url || ''
      };
    }
  }

  async saveProfile() {
    this.saving.set(true);
    this.statusMessage.set('');
    
    try {
      await this.authService.updateProfile(this.profileFormModel);
      this.statusMessage.set('Profile updated successfully');
      this.isError.set(false);
      
      // Clear message after 3 seconds
      setTimeout(() => this.statusMessage.set(''), 3000);
    } catch (error) {
      console.error('Update profile error:', error);
      this.statusMessage.set('Failed to update profile');
      this.isError.set(true);
    } finally {
      this.saving.set(false);
    }
  }
}

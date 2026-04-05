import { Component, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="animate-fade-up profile-container">
      <div class="page-header" style="margin-bottom: 32px;">
        <h1 class="page-title">My Profile</h1>
        <p class="page-subtitle">Manage your personal information</p>
      </div>
      
      <div class="glass-card form-card">
        <!-- Avatar Section -->
        <div class="avatar-section">
          <div class="avatar-circle">
            @if (avatarUrl()) {
               <img [src]="avatarUrl()" alt="Avatar" class="avatar-img">
            } @else {
               <span>{{ auth.profile()?.full_name?.charAt(0)?.toUpperCase() ?? 'U' }}</span>
            }
          </div>
          <div class="avatar-actions">
             <button class="btn btn-secondary btn-sm" (click)="promptAvatar()">Change Photo</button>
             <p class="help-text">JPG, GIF or PNG. 1MB max.</p>
          </div>
        </div>

        <form (ngSubmit)="saveProfile()" class="profile-form">
          <div class="input-group">
            <label class="input-label" for="fullName">Full Name</label>
            <input type="text" id="fullName" class="input-field" [(ngModel)]="fullName" name="fullName" required>
          </div>

          <div class="input-group">
            <label class="input-label" for="bio">Bio</label>
            <textarea id="bio" class="input-field" rows="4" [(ngModel)]="bio" name="bio" placeholder="Tell us a little bit about yourself..."></textarea>
          </div>

          <div class="input-group">
            <label class="input-label" for="role">Account Role</label>
            <input type="text" id="role" class="input-field" [value]="auth.profile()?.role | titlecase" disabled style="background: var(--bg-elevated); cursor: not-allowed">
            <p class="help-text" style="margin-top: 4px;">Role cannot be changed after account creation.</p>
          </div>

          @if (error()) {
            <div class="error-text">⚠ {{ error() }}</div>
          }
           @if (successMessage()) {
             <div class="success-text">✓ {{ successMessage() }}</div>
           }

          <div class="form-actions" style="margin-top: 32px; border-top: 1px solid var(--border); padding-top: 24px; display: flex; justify-content: flex-end;">
            <button type="submit" class="btn btn-primary" [disabled]="loading()">
              {{ loading() ? 'Saving...' : 'Save Changes' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .profile-container { max-width: 800px; }
    .page-title { font-size: 32px; font-weight: 700; letter-spacing: -0.02em; }
    .page-subtitle { color: var(--text-secondary); margin-top: 4px; font-size: 15px; }
    
    .form-card { padding: 40px; }
    .profile-form { display: flex; flex-direction: column; gap: 24px; }
    
    .avatar-section {
      display: flex;
      align-items: center;
      gap: 24px;
      margin-bottom: 32px;
      padding-bottom: 32px;
      border-bottom: 1px solid var(--border);
    }
    .avatar-circle {
      width: 80px; height: 80px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--accent-blue), var(--accent-purple));
      display: flex; align-items: center; justify-content: center;
      font-size: 28px; font-weight: 700; color: white;
      overflow: hidden;
    }
    .avatar-img { width: 100%; height: 100%; object-fit: cover; }
    .avatar-actions { display: flex; flex-direction: column; gap: 8px; }
    .help-text { font-size: 13px; color: var(--text-secondary); }

    .error-text { color: var(--accent-red); font-size: 14px; }
    .success-text { color: var(--accent-green); font-size: 14px; }
  `]
})
export class ProfileComponent {
  fullName = signal('');
  bio = signal('');
  avatarUrl = signal('');
  
  loading = signal(false);
  error = signal('');
  successMessage = signal('');

  constructor(public auth: AuthService) {
    // Sync local form state with the reactive profile signal
    effect(() => {
      const profile = this.auth.profile();
      if (profile) {
         // Untracked so we only set it initially when profile loads/changes from backend, 
         // without causing infinite effect loops if we bound signal directly
         this.fullName.set(profile.full_name || '');
         this.bio.set(profile.bio || '');
         this.avatarUrl.set(profile.avatar_url || '');
      }
    });
  }

  promptAvatar() {
     const url = prompt('Enter image URL for avatar:', this.avatarUrl());
     if (url !== null) {
        this.avatarUrl.set(url);
     }
  }

  async saveProfile() {
    if (!this.fullName()) {
      this.error.set('Full Name is required');
      return;
    }
    
    this.loading.set(true);
    this.error.set('');
    this.successMessage.set('');

    try {
      await this.auth.updateProfile({
        full_name: this.fullName(),
        bio: this.bio(),
        avatar_url: this.avatarUrl()
      });
      this.successMessage.set('Profile updated successfully!');
      setTimeout(() => this.successMessage.set(''), 3000);
    } catch (e: any) {
      this.error.set(e.message || 'Error updating profile');
    } finally {
      this.loading.set(false);
    }
  }
}

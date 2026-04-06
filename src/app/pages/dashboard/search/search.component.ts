import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService, Profile } from '../../../core/services/auth.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="animate-fade-up">
       <div class="page-header" style="margin-bottom: 32px;">
        <h1 class="page-title">Discover Creators</h1>
        <p class="page-subtitle">Find the perfect match for your next campaign</p>
      </div>
      
      <div class="search-bar-container">
         <input 
            type="text" 
            class="search-input input" 
            placeholder="Search by name or bio..." 
            [ngModel]="searchQuery()"
            (ngModelChange)="searchQuery.set($event)" />
      </div>
      
      @if (loading()) {
        <div class="creators-grid">
           <div class="skeleton creator-card" style="height: 280px; border-radius: var(--radius-lg)"></div>
           <div class="skeleton creator-card" style="height: 280px; border-radius: var(--radius-lg)"></div>
           <div class="skeleton creator-card" style="height: 280px; border-radius: var(--radius-lg)"></div>
        </div>
      } @else if (filteredCreators().length === 0) {
        <div class="empty-state">
            <div class="empty-state-icon">🔍</div>
            <h3>No Creators Found</h3>
            <p>Try adjusting your search criteria.</p>
        </div>
      } @else {
        <div class="creators-grid">
          @for (creator of filteredCreators(); track creator.id) {
            <div class="glass-card creator-card">
               <div class="creator-header">
                 <img [src]="creator.avatar_url || 'assets/default-avatar.png'" alt="Avatar" class="creator-avatar" />
                 <h3 class="creator-name">{{ creator.full_name }}</h3>
                 <span class="badge badge-active" style="margin-top: 4px;">Influencer</span>
               </div>
               <p class="creator-bio">{{ creator.bio || 'This creator has not added a bio yet.' }}</p>
               <div class="creator-actions">
                 <button class="btn btn-outline" style="width: 100%">View Profile</button>
               </div>
            </div>
          }
        </div>
      }
    </div>
  `,
  styles: [`
    .page-title { font-size: 32px; font-weight: 700; letter-spacing: -0.02em; }
    .page-subtitle { color: var(--text-secondary); margin-top: 4px; font-size: 15px; }
    
    .search-bar-container {
      margin-bottom: 32px;
    }
    .search-input {
      width: 100%;
      max-width: 600px;
      padding: 14px 20px;
      font-size: 16px;
      border-radius: var(--radius-lg);
      background: var(--bg-card);
      border: 1px solid var(--border-strong);
      color: var(--text-primary);
      transition: border-color 0.2s, box-shadow 0.2s;
    }
    .search-input:focus {
      outline: none;
      border-color: var(--primary);
      box-shadow: 0 0 0 3px rgba(var(--primary-rgb, 99, 102, 241), 0.15);
    }
    
    .creators-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 24px;
    }
    
    .creator-card {
      padding: 24px;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      height: 100%;
    }
    .creator-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 24px -8px rgba(0,0,0,0.1);
    }
    
    .creator-header {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 16px;
    }
    .creator-avatar {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      object-fit: cover;
      margin-bottom: 16px;
      border: 2px solid var(--border-weak);
    }
    .creator-name {
      font-size: 18px;
      font-weight: 600;
      letter-spacing: -0.01em;
    }
    .creator-bio {
      font-size: 14px;
      color: var(--text-secondary);
      margin-bottom: 24px;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
      flex-grow: 1;
      line-height: 1.5;
    }
    .creator-actions {
      width: 100%;
      margin-top: auto;
    }

    .empty-state {
        text-align: center;
        padding: 80px 24px;
        background: var(--bg-card);
        border: 1px dashed var(--border-strong);
        border-radius: var(--radius-lg);
    }
    .empty-state-icon { font-size: 48px; color: var(--text-tertiary); margin-bottom: 16px; }
    .empty-state h3 { font-size: 20px; font-weight: 600; margin-bottom: 8px; }
    .empty-state p { color: var(--text-secondary); font-size: 15px; }
  `]
})
export class SearchComponent implements OnInit {
  creators = signal<Profile[]>([]);
  loading = signal(true);
  searchQuery = signal('');
  
  filteredCreators = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    if (!query) return this.creators();
    
    return this.creators().filter(creator => 
      creator.full_name?.toLowerCase().includes(query) || 
      creator.bio?.toLowerCase().includes(query)
    );
  });

  constructor(private authService: AuthService) {}

  async ngOnInit() {
    this.loading.set(true);
    try {
      const data = await this.authService.getCreators();
      this.creators.set(data);
    } catch (error) {
      console.error('Error fetching creators:', error);
    } finally {
      this.loading.set(false);
    }
  }
}

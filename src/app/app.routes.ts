import { Routes } from '@angular/router';
import { authGuard, guestGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
    canActivate: [guestGuard]
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent),
    canActivate: [guestGuard]
  },
  {
    path: 'signup',
    loadComponent: () => import('./pages/signup/signup.component').then(m => m.SignupComponent),
    canActivate: [guestGuard]
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/dashboard/overview/overview.component').then(m => m.OverviewComponent)
      },
      {
        path: 'campaigns',
        loadComponent: () => import('./pages/dashboard/campaigns/campaigns.component').then(m => m.CampaignsComponent)
      },
      {
        path: 'campaigns/new',
        loadComponent: () => import('./pages/dashboard/campaigns-new/campaigns-new.component').then(m => m.CampaignsNewComponent)
      },
      {
        path: 'search',
        loadComponent: () => import('./pages/dashboard/search/search.component').then(m => m.SearchComponent)
      },
      {
        path: 'find-work',
        loadComponent: () => import('./pages/dashboard/find-work/find-work.component').then(m => m.FindWorkComponent)
      },
      {
        path: 'profile',
        loadComponent: () => import('./pages/dashboard/profile/profile.component').then(m => m.ProfileComponent)
      },
      {
        path: 'messages',
        loadComponent: () => import('./pages/dashboard/messages/messages.component').then(m => m.MessagesComponent)
      },
      {
        path: 'settings',
        loadComponent: () => import('./pages/dashboard/settings/settings.component').then(m => m.SettingsComponent)
      }
    ]
  },
  { path: '**', redirectTo: '' }
];

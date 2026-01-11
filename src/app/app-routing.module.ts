import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  {
    path: 'home',
    loadComponent: () =>
      import('./tab1/tab1.page').then((m) => m.Tab1Page),
  },
  {
    path: 'add-streak',
    loadComponent: () =>
      import('./add-streak/add-streak.page').then((m) => m.AddStreakPage),
  },

  { path: '**', redirectTo: 'home' },
];

import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/events',
    pathMatch: 'full',
  },
  {
    path: 'events',
    title: 'Events',
    loadComponent: () =>
      import('./pages/event-overview/event-overview').then((m) => m.EventOverviewComponent),
  },
  {
    path: 'event/:id',
    title: 'Event Details',
    loadComponent: () =>
      import('./pages/event-detail/event-detail').then((m) => m.EventDetailComponent),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/event-overview/event-overview').then((m) => m.EventOverviewComponent),
  },
];

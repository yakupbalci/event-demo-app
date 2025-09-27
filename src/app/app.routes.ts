import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/event-overview',
    pathMatch: 'full',
  },
  {
    path: 'event-overview',
    title: 'Events',
    loadComponent: () =>
      import('./pages/event-overview/event-overview').then((m) => m.EventOverview),
  },
];

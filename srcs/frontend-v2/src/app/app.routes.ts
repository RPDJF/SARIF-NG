import { Routes } from '@angular/router';
import { HistoryComponent } from './pages/history/history.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'history',
    component: HistoryComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
];

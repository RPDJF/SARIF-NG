import { Routes } from '@angular/router';
import { FriendsPanelComponent } from './panels/friends-panel/friends-panel.component';
import { PongPanelComponent } from './panels/pong-panel/pong-panel.component';
import { SettingsPanelComponent } from './panels/settings-panel/settings-panel.component';

export const sidebarRoutes: Routes = [
  {
    path: 'pong',
    component: PongPanelComponent,
    outlet: 'sidebar',
  },
  {
    path: 'friends',
    component: FriendsPanelComponent,
    outlet: 'sidebar',
  },
  {
    path: 'settings',
    component: SettingsPanelComponent,
    outlet: 'sidebar',
  },
];

import { DOCUMENT } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngxs/store';
import { FriendsPanelComponent } from './shared/ui/sidebar/panels/friends-panel/friends-panel.component';
import { PongPanelComponent } from './shared/ui/sidebar/panels/pong-panel/pong-panel.component';
import { SettingsPanelComponent } from './shared/ui/sidebar/panels/settings-panel/settings-panel.component';
import { SidebarComponent } from './shared/ui/sidebar/sidebar.component';
import { SidebarConfig } from './shared/ui/sidebar/sidebar.component.types';
import { TopbarComponent } from './shared/ui/topbar/topbar.component';
import { UserFetchMe } from './state/user/user.actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, TopbarComponent],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  #document = inject(DOCUMENT);
  readonly #store = inject(Store);

  sidebarConfig: SidebarConfig = [
    {
      name: 'navbar.home.label',
      routerLink: 'home',
      iconAsset: 'assets/ui/home-svgrepo-com.svg',
    },
    {
      name: 'navbar.pong.label',
      content: PongPanelComponent,
      iconAsset: 'assets/ui/ping-pong-svgrepo-com.svg',
    },
    {
      name: 'navbar.friend.label',
      content: FriendsPanelComponent,
      iconAsset: 'assets/ui/friend-svgrepo-com.svg',
    },
    {
      name: 'navbar.history.label',
      routerLink: 'history',
      iconAsset: 'assets/ui/history-svgrepo-com.svg',
    },
    {
      name: 'navbar.profile.label',
      routerLink: 'profile',
      iconAsset: 'assets/ui/profile-round-1342-svgrepo-com.svg',
    },
    {
      name: 'navbar.settings.label',
      content: SettingsPanelComponent,
      iconAsset: 'assets/ui/settings-svgrepo-com.svg',
      bottom: true,
    },
  ];

  ngOnInit(): void {
    this.#document.body.classList.add('dark');
    this.#store.dispatch(new UserFetchMe()).subscribe();
  }
}

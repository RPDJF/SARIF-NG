import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './shared/ui/sidebar/sidebar.component';
import { SidebarConfig } from './shared/ui/sidebar/sidebar.component.types';
import { TopbarComponent } from './shared/ui/topbar/topbar.component'
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, TopbarComponent],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  private document = inject(DOCUMENT);
  title = 'frontend-v2';
  sidebarConfig: SidebarConfig = [
    {
      name: "Home",
      routerLink: "home",
      iconAsset: "assets/ui/home-svgrepo-com.svg",
    }, {
      name: "Pong",
      routerLink: "pong",
      iconAsset: "assets/ui/ping-pong-svgrepo-com.svg",
    }, {
      name: "Friends",
      routerLink: "friends",
      iconAsset: "assets/ui/friend-svgrepo-com.svg",
    }, {
      name: "History",
      routerLink: "history",
      iconAsset: "assets/ui/history-svgrepo-com.svg",
    }, {
      name: "Profile",
      routerLink: "profile",
      iconAsset: "assets/ui/profile-round-1342-svgrepo-com.svg",
    }, {
      name: "Settings",
      href: "https://google.com",
      iconAsset: "assets/ui/settings-svgrepo-com.svg",
    },
  ];

  ngOnInit(): void {
    this.document.body.classList.add('dark');
  }
}

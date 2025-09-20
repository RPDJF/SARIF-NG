import { Component, inject, input, InputSignal } from '@angular/core';
import { SidebarConfig, sidebarElement } from './sidebar.component.types';
import { RouterLink, RouterModule } from "@angular/router";
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  config: InputSignal<SidebarConfig> = input.required();

  private router: Router = new Router();

  ngOnInit() {
    for (const item of this.config()) {
      if (!item.routerLink && !item.href)
        throw "RouterLink or href are required";
    }
  }

  public onMenuClick(item: sidebarElement) {
    if (item.routerLink)
      this.router.navigate([item.routerLink]);
    else
      window.open(item.href, "_blank");
  }
}

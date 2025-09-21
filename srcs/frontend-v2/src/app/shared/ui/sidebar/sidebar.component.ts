import { SidebarConfig, sidebarElement } from './sidebar.component.types';
import { Component, computed, inject, input, InputSignal } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { I18nState } from '../../../state/i18n/i18n.state';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  config: InputSignal<SidebarConfig> = input.required();

  private router: Router = new Router();
  private readonly store = inject(Store);

  ngOnInit() {
    for (const item of this.config()) {
      if (!item.routerLink && !item.href)
        throw 'RouterLink or href are required';
      if (item.nameSignal) continue;
      item.nameSignal = computed<string>(() => {
        return this.store.selectSignal(I18nState.getI18n)()[item.name];
      });
    }
  }

  public onMenuClick(item: sidebarElement) {
    if (item.routerLink) this.router.navigate([item.routerLink]);
    else window.open(item.href, '_blank');
  }
}

import { NgComponentOutlet } from '@angular/common';
import { Component, input, InputSignal, signal, Type } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarConfig, sidebarElement } from './sidebar.component.types';
import { I18nPipe } from '../../../core/pipes/i18n/i18n.pipe';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  templateUrl: './sidebar.component.html',
  imports: [NgComponentOutlet, I18nPipe],
})
export class SidebarComponent {
  public config: InputSignal<SidebarConfig> = input.required();

  public readonly currentChild = signal<Type<unknown> | null>(null);

  #router: Router = new Router();

  ngOnInit() {
    const bottom = this.config()
      .sort((a, b) => (a.bottom ? 1 : 0) - (b.bottom ? 1 : 0))
      .find((item) => item.bottom);
    if (bottom) bottom.addClass += ' mt-auto';

    for (const item of this.config()) {
      if (!item.routerLink && !item.href && !item.content)
        throw 'RouterLink, content or href properties are required';
    }
  }

  public closeMenu() {
    this.currentChild.set(null);
  }

  public onMenuEnter(item: sidebarElement) {
    if (item.content) this.onMenuClick(item);
    else this.currentChild.set(item.content || null);
  }

  public onMenuClick(item: sidebarElement) {
    this.currentChild.set(item.content || null);
    if (item.routerLink) this.#router.navigate([item.routerLink]);
    else if (item.href) window.open(item.href, '_blank');
  }
}

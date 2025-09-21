import {
  Component,
  computed,
  inject,
  input,
  InputSignal,
  signal,
} from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Store } from '@ngxs/store';
import { I18nState } from '../../../state/i18n/i18n.state';
import { SidebarConfig, sidebarElement } from './sidebar.component.types';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  templateUrl: './sidebar.component.html',
  imports: [RouterOutlet],
})
export class SidebarComponent {
  public config: InputSignal<SidebarConfig> = input.required();

  public readonly currentChild = signal<Object | null>(null);

  private router: Router = new Router();
  private readonly store = inject(Store);

  ngOnInit() {
    for (const item of this.config()) {
      if (!item.routerLink && !item.href && !item.content)
        throw 'RouterLink, content or href properties are required';
      if (item.nameSignal) continue;
      item.nameSignal = computed<string>(() => {
        return this.store.selectSignal(I18nState.getI18n)()[item.name];
      });
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
    if (item.content)
      this.router.navigate(
        [
          '',
          {
            outlets: {
              sidebar: item.content,
            },
          },
        ],
        {
          skipLocationChange: true,
        },
      );
    if (item.routerLink) this.router.navigate([item.routerLink]);
    else if (item.content) this.currentChild.set(item.content);
    else if (item.href) window.open(item.href, '_blank');
  }
}

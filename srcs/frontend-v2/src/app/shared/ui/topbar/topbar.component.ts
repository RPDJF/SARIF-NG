import { Component, inject } from '@angular/core';
import { langCode } from '../../../state/i18n/i18n.state.types';
import { Store } from '@ngxs/store';
import { I18nUpdateLang } from '../../../state/i18n/i18n.actions';
import { langButton } from './topbar.component.types';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [],
  templateUrl: './topbar.component.html',
})
export class TopbarComponent {
  private readonly store = inject(Store);

  public readonly langButtonsConfig: langButton[] = [
    {
      langCode: 'english',
      icon: 'assets/ui/flags/united-kingdom-svgrepo-com.svg',
    },
    {
      langCode: 'french',
      icon: 'assets/ui/flags/france-svgrepo-com.svg',
    },
    {
      langCode: 'portuguese',
      icon: 'assets/ui/flags/flag-for-portugal-svgrepo-com.svg',
    },
    {
      langCode: 'russian',
      icon: 'assets/ui/flags/russia-svgrepo-com.svg',
    },
  ];

  public onLangChange(langCode: langCode) {
    this.store
      .dispatch(
        new I18nUpdateLang({
          langCode,
        }),
      )
      .subscribe();
  }
}

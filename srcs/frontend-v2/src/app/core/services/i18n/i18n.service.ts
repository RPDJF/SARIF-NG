import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { I18nUpdateLang } from '../../../state/i18n/i18n.actions';
import { langCode, langKeys } from './../../../state/i18n/i18n.state.types';

@Injectable({
  providedIn: 'root',
})
export class I18nService {
  private httpClient = inject(HttpClient);

  private readonly store = inject(Store);

  constructor() {}

  init() {
    const langCode =
      typeof window !== 'undefined'
        ? ((localStorage.getItem('lang') as langCode) ?? 'english')
        : 'english';

    this.store.dispatch(
      new I18nUpdateLang({
        langCode,
        skipStorage: true,
      }),
    );
  }

  public loadTranslate(code: langCode) {
    return this.httpClient.get<Record<langKeys, string>>(
      `assets/i18n/${code}.json`,
    );
  }
}

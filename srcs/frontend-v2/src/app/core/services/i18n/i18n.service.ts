import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { I18nUpdateLang } from '../../../state/i18n/i18n.actions';
import { I18nState } from '../../../state/i18n/i18n.state';
import {
  I18nCollection,
  LangCode,
  TranslationKey,
} from './../../../state/i18n/i18n.state.types';

@Injectable({
  providedIn: 'root',
})
export class I18nService {
  #httpClient = inject(HttpClient);

  readonly #store = inject(Store);

  constructor() {}

  init() {
    const LangCode =
      typeof window !== 'undefined'
        ? ((localStorage.getItem('lang') as LangCode) ?? 'english')
        : 'english';

    this.#store.dispatch(
      new I18nUpdateLang({
        LangCode,
        skipStorage: true,
      }),
    );
  }

  public loadTranslate(code: LangCode) {
    return this.#httpClient.get<I18nCollection>(`assets/i18n/${code}.json`);
  }

  #sanityCheck(key: TranslationKey, value: string) {
    if (!value) {
      console.error(`❌ missing translation for ${key} !`);
      return `❌ !${key}`;
    }
    return value;
  }

  public translate(key: TranslationKey) {
    return computed(() =>
      this.#sanityCheck(
        key,
        this.#store
          .selectSignal(I18nState.getI18n)()
          [key].replaceAll('\n', '<br>') || `❌ !${key}`,
      ),
    );
  }

  public translateSnapshot(key: TranslationKey) {
    return this.translate(key)();
  }
}

import { inject, Injectable } from '@angular/core';
import { State, Action, Selector, StateContext } from '@ngxs/store';
import { I18nUpdateLang } from './i18n.actions';
import { LangCode, TranslationKey, I18nCollection } from './i18n.state.types';
import english from '../../../assets/i18n/english.json';
import { I18nService } from '../../core/services/i18n/i18n.service';
import { catchError, of, tap } from 'rxjs';

export interface I18nStateModel {
  lang: LangCode;
  i18n: I18nCollection;
}

@State<I18nStateModel>({
  name: 'i18n',
  defaults: {
    lang: 'english',
    i18n: english,
  },
})
@Injectable()
export class I18nState {
  private i18nService = inject(I18nService);

  @Selector()
  static getState(state: I18nStateModel) {
    return state;
  }

  @Selector()
  static getLang(state: I18nStateModel) {
    return state.lang;
  }

  @Selector()
  static getI18n(state: I18nStateModel) {
    return state.i18n;
  }

  @Selector()
  static getTranslation(state: I18nStateModel) {
    return (key: TranslationKey) => state.i18n[key];
  }

  @Action(I18nUpdateLang)
  updateLang(ctx: StateContext<I18nStateModel>, { payload }: I18nUpdateLang) {
    return this.i18nService.loadTranslate(payload.LangCode).pipe(
      tap((language) => {
        ctx.setState({ lang: payload.LangCode, i18n: language });
        if (!payload.skipStorage)
          localStorage.setItem('lang', payload.LangCode);
      }),
      catchError((err) => {
        console.error(`Failed to load ${payload.LangCode} translations`, err);
        return of({});
      }),
    );
  }
}

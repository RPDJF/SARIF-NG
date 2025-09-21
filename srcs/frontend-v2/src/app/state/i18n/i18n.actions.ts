import { I18nUpdateLangPayload, langCode } from './i18n.state.types';

export class I18nUpdateLang {
  static readonly type = '[I18n] Update Lang';
  constructor(readonly payload: I18nUpdateLangPayload) {}
}

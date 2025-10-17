import english from '../../../assets/i18n/english.json';

export type LangCode = 'english' | 'french' | 'portuguese' | 'russian';
export type TranslationKey = keyof typeof english;
export type I18nCollection = Record<TranslationKey, string>;

export interface I18nUpdateLangPayload {
  LangCode: LangCode;
  skipStorage?: boolean;
}

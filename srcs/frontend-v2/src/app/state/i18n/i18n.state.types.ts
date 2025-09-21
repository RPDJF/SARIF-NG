import english from '../../../assets/i18n/english.json';

export type langCode = 'english' | 'french' | 'portuguese' | 'russian';
export type langKeys = keyof typeof english;

export interface I18nUpdateLangPayload {
  langCode: langCode;
  skipStorage?: boolean;
}

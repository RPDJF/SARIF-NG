import { Type } from '@angular/core';
import { TranslationKey } from '../../../state/i18n/i18n.state.types';

export interface modalServiceOpenProp<T> {
  component: Type<T>;
  data?: any;
  icon?: string;
  title?: TranslationKey;
}

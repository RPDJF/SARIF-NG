import { OutputEmitterRef, Type } from '@angular/core';
import { TranslationKey } from '../../../core/state/i18n/i18n.state.types';
import { ModalChildComponent } from '../../../modals/modal-child/modal-child.component';

type OutputValue<T> = T extends OutputEmitterRef<infer U> ? U : never;

export interface modalServiceOpenProp<T extends ModalChildComponent> {
  component: Type<T>;
  data?: ReturnType<T['data']>;
  icon?: string;
  title?: TranslationKey;
  onSubmit?: (val: OutputValue<T['submit']>) => any;
}

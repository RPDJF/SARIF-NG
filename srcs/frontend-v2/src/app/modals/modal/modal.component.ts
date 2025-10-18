import { Component, ComponentRef, input, output } from '@angular/core';
import { I18nPipe } from '../../core/pipes/i18n/i18n.pipe';
import { TranslationKey } from '../../state/i18n/i18n.state.types';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [I18nPipe],
  templateUrl: './modal.component.html',
})
export class ModalComponent<T> {
  title = input<TranslationKey>();
  icon = input<string>();
  data = input();
  childRef = input<ComponentRef<T>>();
  close = output();
}

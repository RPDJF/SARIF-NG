import { Component, input, output } from '@angular/core';
import { I18nPipe } from '../../core/pipes/i18n/i18n.pipe';
import { TranslationKey } from '../../core/state/i18n/i18n.state.types';
import { MainBoxComponent } from '../../shared/ui/common/boxes/main-box/main-box.component';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [I18nPipe, MainBoxComponent],
  templateUrl: './modal.component.html',
})
export class ModalComponent {
  title = input<TranslationKey>();
  icon = input<string>();
  data = input();
  close = output();
}

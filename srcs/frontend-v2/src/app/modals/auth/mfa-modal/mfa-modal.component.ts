import { Component, signal } from '@angular/core';
import { I18nPipe } from '../../../core/pipes/i18n/i18n.pipe';
import { InputComponent } from '../../../shared/ui/common/inputs/input/input.component';

@Component({
  selector: 'app-mfa-modal',
  standalone: true,
  imports: [InputComponent, I18nPipe],
  templateUrl: './mfa-modal.component.html',
})
export class MfaModalComponent {
  verificationCode = signal('');

  onSubmitButtonClick() {}
}

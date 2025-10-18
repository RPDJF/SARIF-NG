import { Component, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { I18nPipe } from '../../../core/pipes/i18n/i18n.pipe';
import { InputComponent } from '../../../shared/ui/common/inputs/input/input.component';
import { ModalChildComponent } from '../../modal-child/modal-child.component';

@Component({
  selector: 'app-mfa-modal',
  standalone: true,
  imports: [InputComponent, I18nPipe, FormsModule],
  templateUrl: './mfa-modal.component.html',
})
export class MfaModalComponent extends ModalChildComponent {
  verificationCode = signal('');
  override submit = output<string>();
  override data = input();

  onSubmitButtonClick() {
    const codeString = this.verificationCode();
    if (!codeString.trim()) return;
    this.submit.emit(codeString);
  }
}

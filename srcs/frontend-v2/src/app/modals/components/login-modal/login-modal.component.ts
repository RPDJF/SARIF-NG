import { Component, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { I18nPipe } from '../../../core/pipes/i18n/i18n.pipe';
import { InputComponent } from '../../../shared/ui/common/inputs/input/input.component';
import { ModalChildComponent } from '../../modal-child/modal-child.component';
import { LoginModalResult } from './login-modal.component.types';

@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [InputComponent, FormsModule, I18nPipe],
  templateUrl: './login-modal.component.html',
})
export class LoginModalComponent extends ModalChildComponent {
  username = signal<string>('');
  password = signal<string>('');
  isLoading = signal(false);
  override submit = output<LoginModalResult>();
  override data = input();

  onLoginButtonClick() {
    this.submit.emit({
      username: this.username(),
      password: this.password(),
    });
  }
}

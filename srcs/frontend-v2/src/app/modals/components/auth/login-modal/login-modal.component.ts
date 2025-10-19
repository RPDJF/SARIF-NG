import { Component, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { I18nPipe } from '../../../../core/pipes/i18n/i18n.pipe';
import { GoogleSigninButtonComponent } from '../../../../shared/ui/auth/google-signin-button/google-signin-button.component';
import { LinkButtonComponent } from '../../../../shared/ui/common/buttons/link-button/link-button.component';
import { InputComponent } from '../../../../shared/ui/common/inputs/input/input.component';
import { ModalChildComponent } from '../../../modal-child/modal-child.component';
import { LoginModalResult } from './login-modal.component.types';

@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [
    InputComponent,
    FormsModule,
    I18nPipe,
    LinkButtonComponent,
    GoogleSigninButtonComponent,
  ],
  templateUrl: './login-modal.component.html',
})
export class LoginModalComponent extends ModalChildComponent {
  override submit = output<LoginModalResult>();
  override data = input();
  username = signal<string>('');
  password = signal<string>('');
  isLoading = signal(false);
  openRegister = output();
  oauth2Login = output();

  onLoginButtonClick() {
    this.submit.emit({
      username: this.username(),
      password: this.password(),
    });
  }
}

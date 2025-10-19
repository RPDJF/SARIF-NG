import {
  Component,
  input,
  InputSignal,
  output,
  OutputEmitterRef,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { I18nPipe } from '../../../../core/pipes/i18n/i18n.pipe';
import { AuthentificationServiceRegisterProp } from '../../../../core/services/authentificationService/authentification.service.types';
import { GoogleSigninButtonComponent } from '../../../../shared/ui/auth/google-signin-button/google-signin-button.component';
import { LinkButtonComponent } from '../../../../shared/ui/common/buttons/link-button/link-button.component';
import { InputComponent } from '../../../../shared/ui/common/inputs/input/input.component';
import { ModalChildComponent } from '../../../modal-child/modal-child.component';

@Component({
  selector: 'app-register-modal',
  standalone: true,
  imports: [
    InputComponent,
    I18nPipe,
    LinkButtonComponent,
    FormsModule,
    GoogleSigninButtonComponent,
  ],
  templateUrl: './register-modal.component.html',
})
export class RegisterModalComponent extends ModalChildComponent {
  override data: InputSignal<any> = input();
  override submit: OutputEmitterRef<AuthentificationServiceRegisterProp> =
    output();
  email = signal('');
  username = signal('');
  password = signal('');
  confirmPassword = signal('');
  isLoading = signal('');
  openLogin = output();
  oauth2Register = output();

  onSubmitButtonClick() {
    if (this.password() !== this.confirmPassword()) return;
    this.submit.emit({
      email: this.email(),
      username: this.username(),
      password: this.password(),
    });
  }
}

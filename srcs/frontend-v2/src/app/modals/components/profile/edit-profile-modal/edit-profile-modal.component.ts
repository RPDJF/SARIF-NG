import {
  Component,
  computed,
  input,
  InputSignal,
  output,
  OutputEmitterRef,
  Signal,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { I18nPipe } from '../../../../core/pipes/i18n/i18n.pipe';
import { AuthentificationServiceRegisterProp } from '../../../../core/services/authentificationService/authentification.service.types';
import { User } from '../../../../core/state/user/user.state.types';
import { MainBoxComponent } from '../../../../shared/ui/common/boxes/main-box/main-box.component';
import { ButtonComponent } from '../../../../shared/ui/common/buttons/button/button.component';
import { LinkButtonComponent } from '../../../../shared/ui/common/buttons/link-button/link-button.component';
import { InputComponent } from '../../../../shared/ui/common/inputs/input/input.component';
import { UserAvatarComponent } from '../../../../shared/ui/common/user-avatar/user-avatar.component';
import { ModalChildComponent } from '../../../modal-child/modal-child.component';

export interface EditProfileModalComponentData {
  user: Signal<User>;
}

@Component({
  selector: 'app-edit-profile-modal',
  standalone: true,
  imports: [
    InputComponent,
    I18nPipe,
    LinkButtonComponent,
    FormsModule,
    ButtonComponent,
    UserAvatarComponent,
    MainBoxComponent,
  ],
  templateUrl: './edit-profile-modal.component.html',
})
export class EditProfileModalComponent extends ModalChildComponent {
  override data: InputSignal<EditProfileModalComponentData> = input.required();
  override submit: OutputEmitterRef<AuthentificationServiceRegisterProp> =
    output();
  email = signal('');
  username = signal('');
  password = signal('');
  confirmPassword = signal('');
  isLoading = signal(false);
  openLogin = output();

  user = computed(() => this.data().user());

  onSubmitButtonClick() {
    if (this.password() !== this.confirmPassword()) return;
    this.submit.emit({
      email: this.email(),
      username: this.username(),
      password: this.password(),
    });
  }
}

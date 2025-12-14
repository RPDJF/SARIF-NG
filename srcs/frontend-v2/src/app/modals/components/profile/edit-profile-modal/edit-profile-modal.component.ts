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
import { UpdateUserProfileProp } from '../../../../core/services/userService/user.service.types';
import { User } from '../../../../core/state/user/user.state.types';
import { ButtonComponent } from '../../../../shared/ui/common/buttons/button/button.component';
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
    FormsModule,
    ButtonComponent,
    UserAvatarComponent,
  ],
  templateUrl: './edit-profile-modal.component.html',
})
export class EditProfileModalComponent extends ModalChildComponent {
  override data: InputSignal<EditProfileModalComponentData> = input.required();
  override submit: OutputEmitterRef<UpdateUserProfileProp> = output();
  email = signal('');
  username = signal('');
  password = signal('');
  confirmPassword = signal('');
  isLoading = signal(false);
  openLogin = output();

  user = computed(() => this.data().user());

  onSubmitButtonClick() {
    const prop: UpdateUserProfileProp = {};

    prop.email = this.email() || undefined;
    prop.username = this.username() || undefined;
    prop.password = this.password() || undefined;

    if (prop.email === this.user().EmailAddress) prop.email = undefined;
    if (prop.username === this.user().DisplayName) prop.username = undefined;

    if (Object.entries(prop).some((val) => Boolean(val)))
      this.submit.emit(prop);
  }
}

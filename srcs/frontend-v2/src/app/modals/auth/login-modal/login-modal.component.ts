import { Component, inject, output, signal } from '@angular/core';
import { InputComponent } from '../../../shared/ui/common/inputs/input/input.component';
import { Store } from '@ngxs/store';
import { UserLogin } from '../../../state/user/user.actions';
import { FormsModule } from '@angular/forms';
import { I18nPipe } from '../../../core/pipes/i18n/i18n.pipe';

@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [InputComponent, FormsModule, I18nPipe],
  templateUrl: './login-modal.component.html',
})
export class LoginModalComponent {
  close = output();
  username = signal<string>('');
  password = signal<string>('');

  readonly #store = inject(Store);

  closeModal(): void {
    this.close.emit();
  }

  onLoginButtonClick() {
    this.#store.dispatch(
      new UserLogin({
        username: this.username(),
        password: this.password(),
      }),
    );
  }
}

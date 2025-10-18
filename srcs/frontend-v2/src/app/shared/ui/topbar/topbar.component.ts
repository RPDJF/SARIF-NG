import { Component, inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { ModalService } from '../../../core/services/modalService/modal.service';
import { UserService } from '../../../core/services/user/user.service';
import { LoginModalComponent } from '../../../modals/components/login-modal/login-modal.component';
import { MfaModalComponent } from '../../../modals/components/mfa-modal/mfa-modal.component';
import { I18nUpdateLang } from '../../../state/i18n/i18n.actions';
import { LangCode } from '../../../state/i18n/i18n.state.types';
import { UserFetchMe, UserLogin } from '../../../state/user/user.actions';
import { UserState } from '../../../state/user/user.state';
import { ButtonComponent } from '../common/buttons/button/button.component';
import { UserAvatarComponent } from '../common/user-avatar/user-avatar.component';
import { langButton } from './topbar.component.types';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [UserAvatarComponent, ButtonComponent],
  templateUrl: './topbar.component.html',
})
export class TopbarComponent {
  readonly #store = inject(Store);
  readonly #modalService = inject(ModalService);
  readonly #userService = inject(UserService);

  public readonly userProfile = this.#store.selectSignal(UserState.getMe);

  public readonly langButtonsConfig: langButton[] = [
    {
      LangCode: 'english',
      icon: 'assets/ui/flags/united-kingdom-svgrepo-com.svg',
    },
    {
      LangCode: 'french',
      icon: 'assets/ui/flags/france-svgrepo-com.svg',
    },
    {
      LangCode: 'portuguese',
      icon: 'assets/ui/flags/flag-for-portugal-svgrepo-com.svg',
    },
    {
      LangCode: 'russian',
      icon: 'assets/ui/flags/russia-svgrepo-com.svg',
    },
  ];

  public onLangChange(LangCode: LangCode) {
    this.#store
      .dispatch(
        new I18nUpdateLang({
          LangCode,
        }),
      )
      .subscribe();
  }

  public showLoginModal() {
    const modal = this.#modalService.open({
      component: LoginModalComponent,
      title: 'panel.loginPanel.panelTitle',
    });

    modal.instance.isLoading.set(
      this.#store.selectSignal(UserState.isLoginApiLoading)(),
    );

    modal.instance.submit.subscribe((value) => {
      this.#store.dispatch(new UserLogin(value)).subscribe({
        complete: () => this.show2faModal(),
      });
    });
  }

  private show2faModal() {
    // sanity check
    const apiRslt = this.#store.selectSnapshot(UserState.getLoginApiStatus);
    if (!apiRslt.state) throw 'Opening 2faModal but api result not defined';
    console.log(apiRslt);
    if (apiRslt.detail !== '2fa sent')
      throw 'Unkown api result detail for login';
    const modal = this.#modalService.open({
      component: MfaModalComponent,
      title: 'panel.2faPanel.title',
      icon: 'assets/ui/two-factor-authentication-svgrepo-com.svg',
    });

    modal.instance.submit.subscribe((code) => {
      this.#userService.enforce2fa({ code }).subscribe({
        complete: () => {
          modal.instance.close.emit();
          this.#store.dispatch(new UserFetchMe()).subscribe();
        },
      });
    });
  }
}

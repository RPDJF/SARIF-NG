import { Component, inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { ModalService } from '../../../core/services/modalService/modal.service';
import { LoginModalComponent } from '../../../modals/components/login-modal/login-modal.component';
import { I18nUpdateLang } from '../../../state/i18n/i18n.actions';
import { LangCode } from '../../../state/i18n/i18n.state.types';
import { UserLogin } from '../../../state/user/user.actions';
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
      this.#store.dispatch(new UserLogin(value)).subscribe(() => {
        const apiRslt = this.#store.selectSnapshot(UserState.getLoginApiStatus);
        console.log(apiRslt);
      });
    });
  }
}

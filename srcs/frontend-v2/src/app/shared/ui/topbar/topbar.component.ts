import { Component, inject, signal } from '@angular/core';
import { Store } from '@ngxs/store';
import { I18nService } from '../../../core/services/i18nService/i18n.service';
import { ModalService } from '../../../core/services/modalService/modal.service';
import { NotificationService } from '../../../core/services/notificationService/notification.service';
import { NotificationServiceProp } from '../../../core/services/notificationService/notification.service.types';
import {
  AuthentificationEnforce2fa,
  AuthentificationFetchOauth2LoginUrl,
  AuthentificationLogin,
  AuthentificationRegister,
} from '../../../core/state/authentification/authentification.actions';
import {
  AuthentificationState,
  AuthentificationStateModel,
} from '../../../core/state/authentification/authentification.state';
import { I18nUpdateLang } from '../../../core/state/i18n/i18n.actions';
import { LangCode } from '../../../core/state/i18n/i18n.state.types';
import { UserFetchMe, UserLogout } from '../../../core/state/user/user.actions';
import { UserState } from '../../../core/state/user/user.state';
import { LoginModalComponent } from '../../../modals/components/auth/login-modal/login-modal.component';
import { MfaModalComponent } from '../../../modals/components/auth/mfa-modal/mfa-modal.component';
import { RegisterModalComponent } from '../../../modals/components/auth/register-modal/register-modal.component';
import { ButtonComponent } from '../common/buttons/button/button.component';
import { UserAvatarComponent } from '../common/user-avatar/user-avatar.component';
import { langButton } from './topbar.component.types';
import { DropdownMenuComponent } from '../common/dropdown-menu/dropdown-menu.component';
import { I18nPipe } from '../../../core/pipes/i18n/i18n.pipe';
import { DropdownMenuButtonComponent } from '../common/dropdown-menu/components/dropdown-menu-button/dropdown-menu-button.component';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [
    UserAvatarComponent,
    ButtonComponent,
    DropdownMenuComponent,
    I18nPipe,
    DropdownMenuButtonComponent,
    NgIcon,
  ],
  templateUrl: './topbar.component.html',
})
export class TopbarComponent {
  readonly #store = inject(Store);
  readonly #modalService = inject(ModalService);
  readonly #notificationService = inject(NotificationService);
  readonly #i18nService = inject(I18nService);

  readonly openDropwdownMenu = signal(false);

  readonly userProfile = this.#store.selectSignal(UserState.getMe);

  readonly langButtonsConfig: langButton[] = [
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

  public showRegisterModal() {
    const modal = this.#modalService.open({
      component: RegisterModalComponent,
      title: 'modal.components.auth.register.panelTitle',
    });

    /*modal.instance.isLoading
      .set
      this.#store.selectSignal(AuthentificationState.isLoginApiLoading)(),
      ();*/

    modal.instance.submit.subscribe((value) => {
      this.#store.dispatch(new AuthentificationRegister(value)).subscribe({
        complete: () => {
          modal.instance.close.emit();
          this.#store.dispatch(new UserFetchMe()).subscribe();
        },
        error: () => {
          const registerApiStatus = this.#store.selectSnapshot(
            AuthentificationState.getRegisterApiStatus,
          );
          let notificationProp: NotificationServiceProp = {
            title: this.#i18nService.translateSnapshot(
              'modal.components.auth.register.notification.registerErrorTitle',
            ),
            type: 'error',
          };
          switch (registerApiStatus.normalizedSarifHttpResponse?.status) {
            case 409:
              notificationProp = {
                ...notificationProp,
                body: this.#i18nService.translateSnapshot(
                  'modal.components.auth.register.notification.registerCredentialTaken',
                ),
              };
              break;
            default:
              notificationProp = {
                ...notificationProp,
                body: this.#i18nService.translateSnapshot('errors.generic'),
              };
              break;
          }
          this.#notificationService.showNotification(notificationProp);
        },
      });
    });

    modal.instance.openLogin.subscribe(() => this.showLoginModal());

    modal.instance.oauth2Register.subscribe(() => {
      this.#store
        .dispatch(new AuthentificationFetchOauth2LoginUrl())
        .subscribe({
          next: (store: any) => {
            const value = store.authentification as AuthentificationStateModel;
            window.location.href = value.oauth2LoginUrl!;
          },
          error: () => {
            const oauth2LoginUrlApiStatus = this.#store.selectSnapshot(
              AuthentificationState.getOauth2LoginUrlApiStatus,
            );
            let notificationProp: NotificationServiceProp = {
              title: this.#i18nService.translateSnapshot(
                'notification.generic.errorTitle',
              ),
              type: 'error',
            };
            switch (
              oauth2LoginUrlApiStatus.normalizedSarifHttpResponse?.status
            ) {
              default:
                notificationProp = {
                  ...notificationProp,
                  body: this.#i18nService.translateSnapshot(
                    'notification.generic.errorMessage',
                  ),
                };
                break;
            }
            this.#notificationService.showNotification(notificationProp);
          },
        });
    });
  }

  public showLoginModal() {
    const modal = this.#modalService.open({
      component: LoginModalComponent,
      title: 'modal.components.auth.login.panelTitle',
    });

    modal.instance.isLoading.set(
      this.#store.selectSignal(AuthentificationState.isLoginApiLoading)(),
    );

    modal.instance.submit.subscribe((value) => {
      this.#store.dispatch(new AuthentificationLogin(value)).subscribe({
        complete: () => this.show2faModal(),
        error: () => {
          const loginApiStatus = this.#store.selectSnapshot(
            AuthentificationState.getLoginApiStatus,
          );
          let notificationProp: NotificationServiceProp = {
            title: this.#i18nService.translateSnapshot(
              'modal.components.auth.login.notification.loginErrorTitle',
            ),
            type: 'error',
          };
          switch (loginApiStatus.normalizedSarifHttpResponse?.status) {
            case 400:
            case 401:
              notificationProp = {
                ...notificationProp,
                body: this.#i18nService.translateSnapshot(
                  'modal.components.auth.login.notification.loginBadCredentials',
                ),
              };
              break;
            default:
              notificationProp = {
                ...notificationProp,
                body: this.#i18nService.translateSnapshot('errors.generic'),
              };
              break;
          }
          this.#notificationService.showNotification(notificationProp);
        },
      });
    });

    modal.instance.openRegister.subscribe(() => this.showRegisterModal());

    modal.instance.oauth2Login.subscribe(() => {
      this.#store
        .dispatch(new AuthentificationFetchOauth2LoginUrl())
        .subscribe({
          next: (store: any) => {
            const value = store.authentification as AuthentificationStateModel;
            window.location.href = value.oauth2LoginUrl!;
          },
          error: () => {
            const oauth2LoginUrlApiStatus = this.#store.selectSnapshot(
              AuthentificationState.getOauth2LoginUrlApiStatus,
            );
            let notificationProp: NotificationServiceProp = {
              title: this.#i18nService.translateSnapshot(
                'notification.generic.errorTitle',
              ),
              type: 'error',
            };
            switch (
              oauth2LoginUrlApiStatus.normalizedSarifHttpResponse?.status
            ) {
              default:
                notificationProp = {
                  ...notificationProp,
                  body: this.#i18nService.translateSnapshot(
                    'notification.generic.errorMessage',
                  ),
                };
                break;
            }
            this.#notificationService.showNotification(notificationProp);
          },
        });
    });
  }

  private show2faModal() {
    // sanity check
    const apiRslt = this.#store.selectSnapshot(
      AuthentificationState.getLoginApiStatus,
    );
    if (apiRslt.status !== 'success')
      throw 'Opening 2faModal but api result not defined';
    if (apiRslt.normalizedSarifHttpResponse!.detail !== '2fa sent')
      throw 'Unkown api result detail for login';
    const modal = this.#modalService.open({
      component: MfaModalComponent,
      title: 'modal.components.auth.2faPanel.title',
      icon: 'assets/ui/two-factor-authentication-svgrepo-com.svg',
    });

    modal.instance.submit.subscribe((code) => {
      this.#store.dispatch(new AuthentificationEnforce2fa({ code })).subscribe({
        complete: () => {
          modal.instance.close.emit();
          this.#store.dispatch(new UserFetchMe()).subscribe();
        },
        error: () => {
          const enforce2faApiStatus = this.#store.selectSnapshot(
            AuthentificationState.getEnforce2faApiStatus,
          );
          let notificationProp: NotificationServiceProp = {
            title: this.#i18nService.translateSnapshot(
              'modal.components.auth.login.notification.loginErrorTitle',
            ),
            type: 'error',
          };
          switch (enforce2faApiStatus.normalizedSarifHttpResponse?.status) {
            case 400:
            case 404:
            case 401:
              notificationProp = {
                ...notificationProp,
                body: this.#i18nService.translateSnapshot(
                  'modal.components.auth.2faPanel.error.invalidCode',
                ),
              };
              break;
            default:
              notificationProp = {
                ...notificationProp,
                body: this.#i18nService.translateSnapshot('errors.generic'),
              };
              break;
          }
          this.#notificationService.showNotification(notificationProp);
        },
      });
    });
  }

  public logout() {
    this.#store.dispatch(new UserLogout()).subscribe();
  }
}

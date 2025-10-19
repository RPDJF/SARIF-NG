import { inject, Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { catchError, tap, throwError } from 'rxjs';
import { ServiceApiStatus } from '../../interfaces/http.interfaces';
import { AuthentificationService } from '../../services/authentificationService/authentification.service';
import {
  AuthentificationEnforce2fa,
  AuthentificationFetchOauth2LoginUrl,
  AuthentificationLogin,
  AuthentificationRegister,
} from './authentification.actions';

export interface AuthentificationStateModel {
  loginApiStatus: ServiceApiStatus;
  registerApiStatus: ServiceApiStatus;
  enforce2faApiStatus: ServiceApiStatus;
  oauth2LoginUrl: string | undefined;
  oauth2LoginUrlApiStatus: ServiceApiStatus;
}

@State<AuthentificationStateModel>({
  name: 'authentification',
  defaults: {
    loginApiStatus: {
      status: undefined,
    },
    registerApiStatus: {
      status: undefined,
    },
    enforce2faApiStatus: {
      status: undefined,
    },
    oauth2LoginUrl: undefined,
    oauth2LoginUrlApiStatus: {
      status: undefined,
    },
  },
})
@Injectable()
export class AuthentificationState {
  readonly #authentificationService = inject(AuthentificationService);

  @Selector()
  static getState(state: AuthentificationStateModel) {
    return state;
  }

  @Selector()
  static getLoginApiStatus(state: AuthentificationStateModel) {
    return state.loginApiStatus;
  }

  @Selector()
  static getRegisterApiStatus(state: AuthentificationStateModel) {
    return state.registerApiStatus;
  }

  @Selector()
  static getEnforce2faApiStatus(state: AuthentificationStateModel) {
    return state.enforce2faApiStatus;
  }

  @Selector()
  static isLoginApiLoading(state: AuthentificationStateModel) {
    return state.loginApiStatus.status === 'loading';
  }

  @Selector()
  static getOauth2LoginUrl(state: AuthentificationStateModel) {
    return state.oauth2LoginUrl;
  }

  @Selector()
  static getOauth2LoginUrlApiStatus(state: AuthentificationStateModel) {
    return state.oauth2LoginUrlApiStatus;
  }

  @Action(AuthentificationLogin)
  authentificationLogin(
    ctx: StateContext<AuthentificationStateModel>,
    { payload }: AuthentificationLogin,
  ) {
    const stateModel = ctx.getState();
    if (stateModel.loginApiStatus.status === 'loading') return;
    ctx.patchState({
      loginApiStatus: {
        normalizedSarifHttpResponse: undefined,
        status: 'loading',
      },
    });

    const login$ = this.#authentificationService.login(payload).pipe(
      tap((value) => {
        ctx.patchState({
          loginApiStatus: {
            normalizedSarifHttpResponse: value,
            status:
              value.status >= 200 && value.status < 300 ? 'success' : 'error',
          },
        });
      }),
      catchError((error) => {
        ctx.patchState({
          loginApiStatus: {
            normalizedSarifHttpResponse: {
              status: error.status,
              detail: error.message ?? 'Login failed',
            },
            status: 'error',
          },
        });
        return throwError(() => error);
      }),
    );
    return login$;
  }

  @Action(AuthentificationEnforce2fa)
  authentificationEnforce2fa(
    ctx: StateContext<AuthentificationStateModel>,
    { payload }: AuthentificationEnforce2fa,
  ) {
    const stateModel = ctx.getState();
    if (stateModel.enforce2faApiStatus.status === 'loading') return;
    ctx.patchState({
      enforce2faApiStatus: {
        status: 'loading',
      },
    });

    const enforce2fa$ = this.#authentificationService.enforce2fa(payload).pipe(
      tap((value) => {
        ctx.patchState({
          enforce2faApiStatus: {
            status: 'success',
          },
        });
      }),
      catchError((error) => {
        ctx.patchState({
          enforce2faApiStatus: {
            normalizedSarifHttpResponse: {
              status: error.status,
              detail: error.message ?? '2FA failed',
            },
            status: 'error',
          },
        });
        return throwError(() => error);
      }),
    );
    return enforce2fa$;
  }

  @Action(AuthentificationRegister)
  authentificationRegister(
    ctx: StateContext<AuthentificationStateModel>,
    { payload }: AuthentificationRegister,
  ) {
    const stateModel = ctx.getState();
    if (stateModel.registerApiStatus.status === 'loading') return;
    ctx.patchState({
      registerApiStatus: {
        status: 'loading',
      },
    });

    const register$ = this.#authentificationService.register(payload).pipe(
      tap((value) => {
        ctx.patchState({
          registerApiStatus: {
            status: 'success',
          },
        });
      }),
      catchError((error) => {
        ctx.patchState({
          registerApiStatus: {
            normalizedSarifHttpResponse: {
              status: error.status,
              detail: error.message ?? 'Register failed',
            },
            status: 'error',
          },
        });
        return throwError(() => error);
      }),
    );
    return register$;
  }

  @Action(AuthentificationFetchOauth2LoginUrl)
  authentificationFetchOauth2LoginUrl(
    ctx: StateContext<AuthentificationStateModel>,
    {}: AuthentificationFetchOauth2LoginUrl,
  ) {
    const stateModel = ctx.getState();
    if (stateModel.oauth2LoginUrlApiStatus.status === 'loading') return;
    ctx.patchState({
      oauth2LoginUrlApiStatus: {
        status: 'loading',
      },
    });

    const fetchOauth2Url$ = this.#authentificationService
      .fetchOauth2LoginUrl()
      .pipe(
        tap((value) => {
          ctx.patchState({
            oauth2LoginUrl: value.url,
            oauth2LoginUrlApiStatus: {
              status: 'success',
            },
          });
        }),
        catchError((error) => {
          ctx.patchState({
            oauth2LoginUrl: undefined,
            oauth2LoginUrlApiStatus: {
              normalizedSarifHttpResponse: {
                status: error.status,
                detail: error.message ?? 'fetchOauth2Url failed',
              },
              status: 'error',
            },
          });
          return throwError(() => error);
        }),
      );
    return fetchOauth2Url$;
  }
}

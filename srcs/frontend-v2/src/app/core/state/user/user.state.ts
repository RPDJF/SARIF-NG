import { inject, Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { catchError, tap, throwError } from 'rxjs';
import { UserService } from '../../../core/services/user/user.service';
import { ServiceApiStatus } from '../../interfaces/http.interfaces';
import {
  UserEnforce2fa,
  UserFetchMe,
  UserLogin,
  UserRegister,
} from './user.actions';
import { User } from './user.state.types';

export interface UserStateModel {
  me: User | undefined;
  loginApiStatus: ServiceApiStatus;
  registerApiStatus: ServiceApiStatus;
  enforce2faApiStatus: ServiceApiStatus;
}

@State<UserStateModel>({
  name: 'user',
  defaults: {
    me: undefined,
    loginApiStatus: {
      status: undefined,
    },
    registerApiStatus: {
      status: undefined,
    },
    enforce2faApiStatus: {
      status: undefined,
    },
  },
})
@Injectable()
export class UserState {
  readonly #userService = inject(UserService);

  @Selector()
  static getState(state: UserStateModel) {
    return state;
  }

  @Selector()
  static getMe(state: UserStateModel) {
    return state.me;
  }

  @Selector()
  static getLoginApiStatus(state: UserStateModel) {
    return state.loginApiStatus;
  }

  @Selector()
  static getRegisterApiStatus(state: UserStateModel) {
    return state.registerApiStatus;
  }

  @Selector()
  static getEnforce2faApiStatus(state: UserStateModel) {
    return state.enforce2faApiStatus;
  }

  @Selector()
  static isLoginApiLoading(state: UserStateModel) {
    return state.loginApiStatus.status === 'loading';
  }

  @Action(UserFetchMe)
  userFetchMe(ctx: StateContext<UserStateModel>, {}: UserFetchMe) {
    return this.#userService.fetchMe().pipe(
      tap((user) => {
        ctx.patchState({ me: user });
      }),
    );
  }

  @Action(UserLogin)
  userLogin(ctx: StateContext<UserStateModel>, { payload }: UserLogin) {
    const stateModel = ctx.getState();
    if (stateModel.loginApiStatus.status === 'loading') return;
    ctx.patchState({
      loginApiStatus: {
        normalizedSarifHttpResponse: undefined,
        status: 'loading',
      },
    });

    const login$ = this.#userService.login(payload).pipe(
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

  @Action(UserEnforce2fa)
  userEnforce2fa(
    ctx: StateContext<UserStateModel>,
    { payload }: UserEnforce2fa,
  ) {
    const stateModel = ctx.getState();
    if (stateModel.enforce2faApiStatus.status === 'loading') return;
    ctx.patchState({
      enforce2faApiStatus: {
        status: 'loading',
      },
    });

    const enforce2fa$ = this.#userService.enforce2fa(payload).pipe(
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

  @Action(UserRegister)
  userRegister(ctx: StateContext<UserStateModel>, { payload }: UserRegister) {
    const stateModel = ctx.getState();
    if (stateModel.registerApiStatus.status === 'loading') return;
    ctx.patchState({
      registerApiStatus: {
        status: 'loading',
      },
    });

    const register$ = this.#userService.register(payload).pipe(
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
}

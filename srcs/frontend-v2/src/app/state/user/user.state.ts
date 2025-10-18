import { inject, Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { catchError, tap, throwError } from 'rxjs';
import { UserService } from '../../core/services/user/user.service';
import { UserEnforce2fa, UserFetchMe, UserLogin } from './user.actions';
import { User } from './user.state.types';

type apiStatus = 'loading' | 'success' | 'error' | undefined;

export interface UserStateModel {
  me: User | undefined;
  loginApiStatus: {
    code: number | undefined;
    detail: '2fa sent' | unknown | undefined;
    state: apiStatus;
  };
  enforce2faApiStatus: {
    status: apiStatus;
  };
}

@State<UserStateModel>({
  name: 'user',
  defaults: {
    me: undefined,
    loginApiStatus: {
      code: undefined,
      detail: undefined,
      state: undefined,
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
  static isLoginApiLoading(state: UserStateModel) {
    return state.loginApiStatus.state === 'loading';
  }

  @Action(UserFetchMe)
  fetchMe(ctx: StateContext<UserStateModel>, {}: UserFetchMe) {
    return this.#userService.fetchMe().pipe(
      tap((user) => {
        ctx.patchState({ me: user });
      }),
    );
  }

  @Action(UserLogin)
  login(ctx: StateContext<UserStateModel>, { payload }: UserLogin) {
    const stateModel = ctx.getState();
    if (stateModel.loginApiStatus.state === 'loading') return;
    ctx.patchState({
      loginApiStatus: {
        code: undefined,
        detail: undefined,
        state: 'loading',
      },
    });

    const login$ = this.#userService.login(payload).pipe(
      tap((value) => {
        ctx.patchState({
          loginApiStatus: {
            code: value.status,
            detail: value.detail,
            state:
              value.status >= 200 && value.status < 300 ? 'success' : 'error',
          },
        });
      }),
      catchError((error) => {
        ctx.patchState({
          loginApiStatus: {
            code: error.status,
            detail: error.message ?? 'Login failed',
            state: 'error',
          },
        });
        return throwError(() => error);
      }),
    );
    return login$;
  }

  @Action(UserEnforce2fa)
  enforce2fa(ctx: StateContext<UserStateModel>, { payload }: UserEnforce2fa) {
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
            status: 'error',
          },
        });
        return throwError(() => error);
      }),
    );
    return enforce2fa$;
  }
}

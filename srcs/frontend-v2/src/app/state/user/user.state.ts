import { inject, Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { catchError, tap, throwError } from 'rxjs';
import { UserService } from '../../core/services/user/user.service';
import { UserFetchMe, UserLogin } from './user.actions';
import { User } from './user.state.types';

export interface UserStateModel {
  me: User | null;
  loginApiStatus: {
    code: number | undefined;
    message: string | undefined;
    state: 'loading' | 'success' | 'error' | undefined;
  };
}

@State<UserStateModel>({
  name: 'user',
  defaults: {
    me: null,
    loginApiStatus: {
      code: undefined,
      message: undefined,
      state: undefined,
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
    const stateModel = ctx.getState();
    this.#userService.fetchMe().subscribe((value) => {
      const user = value as User;
      stateModel.me = user;
      ctx.patchState(stateModel);
    });
  }

  @Action(UserLogin)
  login(ctx: StateContext<UserStateModel>, { payload }: UserLogin) {
    const stateModel = ctx.getState();
    if (stateModel.loginApiStatus.state === 'loading') return;
    ctx.patchState({
      loginApiStatus: {
        code: undefined,
        message: undefined,
        state: 'loading',
      },
    });

    const login$ = this.#userService.login(payload).pipe(
      tap((value) => {
        ctx.patchState({
          loginApiStatus: {
            code: value.status,
            message: value.details,
            state:
              value.status >= 200 && value.status < 300 ? 'success' : 'error',
          },
        });
      }),
      catchError((error) => {
        ctx.patchState({
          loginApiStatus: {
            code: error.status,
            message: error.message ?? 'Login failed',
            state: 'error',
          },
        });
        return throwError(() => error);
      }),
    );
    return login$;
    // TODO: Implement login (until 2FA)
  }
}

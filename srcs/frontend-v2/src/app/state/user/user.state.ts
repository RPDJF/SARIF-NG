import { inject, Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
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
    stateModel.loginApiStatus.code = undefined;
    stateModel.loginApiStatus.message = undefined;
    stateModel.loginApiStatus.state = 'loading';
    ctx.patchState(stateModel);
    this.#userService.login(payload).subscribe((value) => {
      stateModel.loginApiStatus.code = value.status;
      stateModel.loginApiStatus.message = value.details;
      stateModel.loginApiStatus.state =
        value.status >= 200 && value.status < 300 ? 'success' : 'error';
      ctx.patchState(stateModel);
      // TODO: Implement login (until 2FA)
    });
  }
}

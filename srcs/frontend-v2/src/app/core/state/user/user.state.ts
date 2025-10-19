import { inject, Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs';
import { ServiceApiStatus } from '../../interfaces/http.interfaces';
import { UserService } from '../../services/userService/user.service';
import { UserFetchMe } from './user.actions';
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

  @Action(UserFetchMe)
  userFetchMe(ctx: StateContext<UserStateModel>, {}: UserFetchMe) {
    return this.#userService.fetchMe().pipe(
      tap((user) => {
        ctx.patchState({ me: user });
      }),
    );
  }
}

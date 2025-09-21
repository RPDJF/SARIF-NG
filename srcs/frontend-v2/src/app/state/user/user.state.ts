import { inject, Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { UserService } from '../../core/services/user/user.service';
import { UserFetchMe } from './user.actions';
import { User } from './user.state.types';

export interface UserStateModel {
  me: User | null;
}

@State<UserStateModel>({
  name: 'user',
  defaults: {
    me: null,
  },
})
@Injectable()
export class UserState {
  private readonly userService = inject(UserService);

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
    this.userService.fetchMe().subscribe((value) => {
      const user = value as User;
      stateModel.me = user;
      ctx.patchState(stateModel);
    });
  }
}

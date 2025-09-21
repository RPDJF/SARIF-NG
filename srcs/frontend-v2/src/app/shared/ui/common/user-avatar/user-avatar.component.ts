import { Component, input } from '@angular/core';
import { User } from '../../../../state/user/user.state.types';

@Component({
  selector: 'app-user-avatar',
  standalone: true,
  imports: [],
  templateUrl: './user-avatar.component.html',
})
export class UserAvatarComponent {
  public user = input.required<User>();
}

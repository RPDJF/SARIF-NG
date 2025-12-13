import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';
import { User } from '../../../../core/state/user/user.state.types';

@Component({
  selector: 'app-user-avatar',
  standalone: true,
  imports: [NgClass],
  templateUrl: './user-avatar.component.html',
})
export class UserAvatarComponent {
  user = input.required<User>();
  size = input<'small' | 'medium' | 'large'>('small');
  redirect = input<boolean>(false);
  canUpdate = input<boolean>(false);
}

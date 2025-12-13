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
  public user = input.required<User>();
  public size = input<'small' | 'large'>('small');
  public redirect = input<boolean>(false);
}

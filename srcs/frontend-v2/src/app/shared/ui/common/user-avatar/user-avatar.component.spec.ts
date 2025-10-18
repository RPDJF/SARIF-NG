import { ComponentFixture, TestBed } from '@angular/core/testing';

import { User } from '../../../../state/user/user.state.types';
import { UserAvatarComponent } from './user-avatar.component';

describe('UserAvatarComponent', () => {
  let component: UserAvatarComponent;
  let fixture: ComponentFixture<UserAvatarComponent>;

  const mockUser: User = {
    Admin: 0,
    Avatar: '',
    DisplayName: '',
    LastAlive: 0,
    PlayerID: '0',
    Private: 0,
    EmailAddress: '',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserAvatarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserAvatarComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('user', mockUser);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

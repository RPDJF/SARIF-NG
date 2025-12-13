import {
  Component,
  computed,
  effect,
  inject,
  OnDestroy,
  signal,
  Signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { lucideUserRoundPen } from '@ng-icons/lucide';
import { Store } from '@ngxs/store';
import { Subscription, tap } from 'rxjs';
import { I18nPipe } from '../../core/pipes/i18n/i18n.pipe';
import { UserService } from '../../core/services/userService/user.service';
import { UserStats } from '../../core/services/userService/user.service.types';
import { UserState } from '../../core/state/user/user.state';
import { User } from '../../core/state/user/user.state.types';
import { ButtonComponent } from '../../shared/ui/common/buttons/button/button.component';
import { UserAvatarComponent } from '../../shared/ui/common/user-avatar/user-avatar.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [UserAvatarComponent, ButtonComponent, NgIconComponent, I18nPipe],
  templateUrl: './profile.component.html',
  viewProviders: [provideIcons({ lucideUserRoundPen })],
})
export class ProfileComponent implements OnDestroy {
  #userService = inject(UserService);
  #activatedRoute = inject(ActivatedRoute);
  #store = inject(Store);
  #queryParams: Signal<Record<string, string | undefined>> = toSignal(
    this.#activatedRoute.queryParams,
    {
      initialValue: {},
    },
  );

  playerId = computed(() => {
    return this.#queryParams()['playerId'];
  });
  isSelfProfile = computed(() => !this.playerId());

  userStatsSub: Subscription | undefined;
  userStats = signal<UserStats | undefined>(undefined);
  user: Signal<User> = computed(() => this.userStats()?.user as User);

  constructor() {
    effect(
      () =>
        this.#updateUser(
          this.playerId() ||
            this.#store.selectSignal(UserState.getMe)()?.PlayerID,
        ),
      {
        allowSignalWrites: true,
      },
    );
  }

  ngOnInit() {}

  ngOnDestroy(): void {
    this.userStatsSub?.unsubscribe();
  }

  /**
   * @description Updates current user signal based on playerId param
   */
  #updateUser(playerId?: User['PlayerID']) {
    this.userStatsSub?.unsubscribe();
    if (!playerId) throw new Error('User not found');
    this.userStatsSub = this.#userService
      .fetchUserStats(playerId)
      .pipe(
        tap((stats) => {
          this.userStats.set(stats);
        }),
      )
      .subscribe({
        error: () => {
          this.userStats.set(undefined);
        },
      });
  }
}

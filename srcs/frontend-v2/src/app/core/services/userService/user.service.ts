import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { catchError, Observable, of } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { UserFetchMe } from '../../state/user/user.actions';
import { User } from '../../state/user/user.state.types';
import { HydratableService } from '../hydratableService/hydratableService';
import { UserStats } from './user.service.types';

@Injectable({
  providedIn: 'root',
})
export class UserService extends HydratableService {
  readonly #httpClient = inject(HttpClient);
  readonly #store = inject(Store);

  hydrateService(): Observable<void> {
    if (localStorage.getItem('isLogged')) {
      return this.#store.dispatch(new UserFetchMe());
    } else {
      return of(undefined);
    }
  }

  getClientId() {
    let clientId: string | null;

    if ((clientId = localStorage.getItem('clientId'))) return clientId;
    clientId = crypto.randomUUID();
    localStorage.setItem('clientId', clientId);
    return clientId;
  }

  fetchMe() {
    return this.#httpClient.get<User>(`${environment.CORE_ENDPOINT}/users/me`);
  }

  fetchUser(playerId: User['PlayerID']) {
    return this.#httpClient.get<User>(
      `${environment.CORE_ENDPOINT}/users/${playerId.toString()}`,
    );
  }

  fetchUserStats(playerId: User['PlayerID']) {
    return this.#httpClient.get<UserStats>(
      `${environment.CORE_ENDPOINT}/users/${playerId.toString()}/stats`,
    );
  }

  logout() {
    return this.#httpClient
      .get<undefined>(`${environment.CORE_ENDPOINT}/users/logout`)
      .pipe(catchError(() => of(undefined)));
  }
}

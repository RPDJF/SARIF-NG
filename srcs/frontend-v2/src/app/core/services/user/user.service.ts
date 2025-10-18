import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { User } from '../../../state/user/user.state.types';
import {
  Enforce2faJSON,
  Enforce2faProp,
  Enforce2faResponseJSON,
  LoginJSON,
  LoginProp,
  LoginResponseJSON,
} from './user.service.types';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  readonly #httpClient = inject(HttpClient);

  public constructor() {}

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

  login(prop: LoginProp) {
    const loginBody: LoginJSON = {
      Password: prop.password,
      ClientId: this.getClientId(),
    };

    prop.username.includes('@')
      ? (loginBody.EmailAddress = prop.username)
      : (loginBody.DisplayName = prop.username);

    loginBody.Password = prop.password;
    return this.#httpClient.post<LoginResponseJSON>(
      `${environment.CORE_ENDPOINT}/users/login`,
      loginBody,
    );
  }

  enforce2fa({ code }: Enforce2faProp) {
    const enforce2faBody: Enforce2faJSON = {
      ClientId: this.getClientId(),
      Code: code,
    };

    return this.#httpClient.post<Enforce2faResponseJSON>(
      `${environment.CORE_ENDPOINT}/users/2fa`,
      enforce2faBody,
    );
  }
}

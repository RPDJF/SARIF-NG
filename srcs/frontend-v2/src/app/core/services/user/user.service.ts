import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { User } from '../../../core/state/user/user.state.types';
import {
  NormalizedSarifHttpResponse,
  NormalizedSarifJwtToken,
} from '../../interfaces/http.interfaces';
import {
  Enforce2faApiPayload,
  Enforce2faServiceProp,
  LoginApiPayload,
  LoginServiceProp,
  RegisterApiPayload,
  RegisterServiceProp,
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

  login(prop: LoginServiceProp) {
    const loginBody: LoginApiPayload = {
      Password: prop.password,
      ClientId: this.getClientId(),
    };

    prop.username.includes('@')
      ? (loginBody.EmailAddress = prop.username)
      : (loginBody.DisplayName = prop.username);

    return this.#httpClient.post<NormalizedSarifHttpResponse>(
      `${environment.CORE_ENDPOINT}/users/login`,
      loginBody,
    );
  }

  enforce2fa({ code }: Enforce2faServiceProp) {
    const enforce2faBody: Enforce2faApiPayload = {
      ClientId: this.getClientId(),
      Code: code,
    };

    return this.#httpClient.post<NormalizedSarifJwtToken>(
      `${environment.CORE_ENDPOINT}/users/2fa`,
      enforce2faBody,
    );
  }

  register({ email, password, username }: RegisterServiceProp) {
    const registerBody: RegisterApiPayload = {
      ClientId: this.getClientId(),
      DisplayName: username,
      Password: password,
      EmailAddress: email,
    };

    return this.#httpClient.post<NormalizedSarifJwtToken>(
      `${environment.CORE_ENDPOINT}/users/register`,
      registerBody,
    );
  }
}

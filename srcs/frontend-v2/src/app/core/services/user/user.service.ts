import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { loginJSON, loginProp } from './user.service.types';

interface loginResponseJSON {
  details: string;
  status: number;
  module: string;
  type: string;
  title: string;
  instance: string;
}

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
    return this.#httpClient.get(`${environment.CORE_ENDPOINT}/users/me`);
  }

  login(prop: loginProp) {
    const loginBody: loginJSON = {
      Password: prop.password,
      ClientId: this.getClientId(),
    };

    prop.username.includes('@')
      ? (loginBody.EmailAddress = prop.username)
      : (loginBody.DisplayName = prop.username);

    loginBody.Password = prop.password;
    return this.#httpClient.post<loginResponseJSON>(
      `${environment.CORE_ENDPOINT}/users/login`,
      loginBody,
    );
  }
}

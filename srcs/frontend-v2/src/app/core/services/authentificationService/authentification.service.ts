import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import {
  NormalizedSarifHttpResponse,
  NormalizedSarifJwtToken,
} from '../../interfaces/http.interfaces';
import { UserService } from '../userService/user.service';
import {
  AuthentificationServiceEnforce2faApiPayload,
  AuthentificationServiceEnforce2faProp,
  AuthentificationServiceLoginApiPayload,
  AuthentificationServiceLoginProp,
  AuthentificationServiceOauth2LoginUrlResponse,
  AuthentificationServiceRegisterApiPayload,
  AuthentificationServiceRegisterProp,
} from './authentification.service.types';

@Injectable({
  providedIn: 'root',
})
export class AuthentificationService {
  readonly #userService = inject(UserService);
  readonly #httpClient = inject(HttpClient);

  constructor() {}

  login(prop: AuthentificationServiceLoginProp) {
    const loginBody: AuthentificationServiceLoginApiPayload = {
      Password: prop.password,
      ClientId: this.#userService.getClientId(),
    };

    prop.username.includes('@')
      ? (loginBody.EmailAddress = prop.username)
      : (loginBody.DisplayName = prop.username);

    return this.#httpClient.post<NormalizedSarifHttpResponse>(
      `${environment.CORE_ENDPOINT}/users/login`,
      loginBody,
    );
  }

  enforce2fa({ code }: AuthentificationServiceEnforce2faProp) {
    const enforce2faBody: AuthentificationServiceEnforce2faApiPayload = {
      ClientId: this.#userService.getClientId(),
      Code: code,
    };

    return this.#httpClient.post<NormalizedSarifJwtToken>(
      `${environment.CORE_ENDPOINT}/users/2fa`,
      enforce2faBody,
    );
  }

  register({ email, password, username }: AuthentificationServiceRegisterProp) {
    const registerBody: AuthentificationServiceRegisterApiPayload = {
      ClientId: this.#userService.getClientId(),
      DisplayName: username,
      Password: password,
      EmailAddress: email,
    };

    return this.#httpClient.post<NormalizedSarifJwtToken>(
      `${environment.CORE_ENDPOINT}/users/register`,
      registerBody,
    );
  }

  fetchOauth2LoginUrl() {
    return this.#httpClient.get<AuthentificationServiceOauth2LoginUrlResponse>(
      `${environment.CORE_ENDPOINT}/oauth2/login?client_id=${this.#userService.getClientId()}`,
    );
  }
}

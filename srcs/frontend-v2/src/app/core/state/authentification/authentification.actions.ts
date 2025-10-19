import {
  AuthentificationServiceEnforce2faProp,
  AuthentificationServiceLoginProp,
  AuthentificationServiceRegisterProp,
} from '../../services/authentificationService/authentification.service.types';

export class AuthentificationLogin {
  static readonly type = '[Authentification] Login';
  constructor(readonly payload: AuthentificationServiceLoginProp) {}
}

export class AuthentificationEnforce2fa {
  static readonly type = '[Authentification] Enforce2fa';
  constructor(readonly payload: AuthentificationServiceEnforce2faProp) {}
}

export class AuthentificationRegister {
  static readonly type = '[Authentification] Register';
  constructor(readonly payload: AuthentificationServiceRegisterProp) {}
}

export class AuthentificationFetchOauth2LoginUrl {
  static readonly type = '[Authentification] Fetch Oauth2 login url';
  constructor() {}
}

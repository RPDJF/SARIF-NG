export interface AuthentificationServiceLoginApiPayload {
  ClientId: string;
  DisplayName?: string;
  EmailAddress?: string;
  Password: string;
}

export interface AuthentificationServiceLoginProp {
  username: string;
  password: string;
}

export interface AuthentificationServiceEnforce2faApiPayload {
  ClientId: string;
  Code: string;
}

export interface AuthentificationServiceEnforce2faProp {
  code: string;
}

export interface AuthentificationServiceRegisterApiPayload {
  ClientId: string;
  DisplayName?: string;
  EmailAddress?: string;
  Password: string;
}

export interface AuthentificationServiceRegisterProp {
  email: string;
  username: string;
  password: string;
}

export interface AuthentificationServiceOauth2LoginUrlResponse {
  url: string;
}

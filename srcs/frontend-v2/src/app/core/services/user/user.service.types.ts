export interface LoginApiPayload {
  ClientId: string;
  DisplayName?: string;
  EmailAddress?: string;
  Password: string;
}

export interface LoginServiceProp {
  username: string;
  password: string;
}

export interface Enforce2faApiPayload {
  ClientId: string;
  Code: string;
}

export interface Enforce2faServiceProp {
  code: string;
}

export interface RegisterApiPayload {
  ClientId: string;
  DisplayName?: string;
  EmailAddress?: string;
  Password: string;
}

export interface RegisterServiceProp {
  email: string;
  username: string;
  password: string;
}

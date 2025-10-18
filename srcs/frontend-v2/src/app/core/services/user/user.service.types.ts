import { User } from '../../../core/state/user/user.state.types';

export interface LoginResponseJSON {
  detail: '2fa sent' | string;
  status: number;
  module: string;
  type: string;
  title: string;
  instance: string;
}

export interface LoginJSON {
  ClientId: string;
  DisplayName?: string;
  EmailAddress?: string;
  Password: string;
}

export interface LoginProp {
  username: string;
  password: string;
}

export interface Enforce2faResponseJSON {
  token: string;
  sub: string;
  data: Partial<User>;
  iss: string;
  iat: number;
  exp: number;
}

export interface Enforce2faJSON {
  ClientId: string;
  Code: string;
}

export interface Enforce2faProp {
  code: string;
}

export interface RegisterResponseJSON {
  token: string;
  sub: string;
  data: Partial<User>;
  iss: string;
  iat: number;
  exp: number;
}

export interface RegisterJSON {
  ClientId: string;
  DisplayName?: string;
  EmailAddress?: string;
  Password: string;
}

export interface RegisterProp {
  email: string;
  username: string;
  password: string;
}

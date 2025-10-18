import {
  Enforce2faProp,
  LoginProp,
  RegisterProp,
} from '../../../core/services/user/user.service.types';

export class UserFetchMe {
  static readonly type = '[User] Fetch me';
  constructor() {}
}

export class UserLogin {
  static readonly type = '[User] Login';
  constructor(readonly payload: LoginProp) {}
}

export class UserEnforce2fa {
  static readonly type = '[User] Enforce2fa';
  constructor(readonly payload: Enforce2faProp) {}
}

export class UserRegister {
  static readonly type = '[User] Register';
  constructor(readonly payload: RegisterProp) {}
}

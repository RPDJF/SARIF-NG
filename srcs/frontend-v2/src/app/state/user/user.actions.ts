import { loginProp } from "../../core/services/user/user.service.types";

export class UserFetchMe {
  static readonly type = '[User] Fetch me';
  constructor() {}
}

export class UserLogin {
  static readonly type = "[User] Login";
  constructor(readonly payload: loginProp) {}
}

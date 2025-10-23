export type inputType =
  | 'text'
  | 'email'
  | 'confirm_email'
  | 'password'
  | 'confirm_password'
  | 'username';

export interface InputPasswordValidatorConfig {
  /**
   * Minimum uppercase characters
   * @default Default 1
   */
  minUpper: number;
  /**
   * Minimum lowercase characters
   * @default Default 1
   */
  minLower: number;
  /**
   * Minimum special characters
   * @default Default 1
   */
  minSpecial: number;
  /**
   * Minimum numerical characters
   * @default Default 1
   */
  minNumber: number;
  /**
   * Minimum characters legth
   * @default Default 8
   */
  minCharacters: number;
}

export interface InputValidatorStatus {
  isValid: boolean;
}

export interface InputPasswordValidatorStatus extends InputValidatorStatus {
  minUpper: boolean;
  minLower: boolean;
  minSpecial: boolean;
  minNumber: boolean;
  minCharacters: boolean;
}

export abstract class InputValidator {
  abstract isValid(value: string, confirm?: string): boolean;
  abstract get status(): InputValidatorStatus;
}

export class InputPasswordValidator extends InputValidator {
  #config: InputPasswordValidatorConfig;

  #status: InputPasswordValidatorStatus = {
    isValid: false,
    minCharacters: false,
    minLower: false,
    minNumber: false,
    minSpecial: false,
    minUpper: false,
  };

  override isValid(password: string): boolean {
    this.#status.minCharacters = password.length >= this.#config.minCharacters;
    this.#status.minUpper =
      password.length - password.replace(/[A-Z]/g, '').length >=
      this.#config.minUpper;
    this.#status.minLower =
      password.length - password.replace(/[a-z]/g, '').length >=
      this.#config.minLower;
    this.#status.minNumber =
      password.length - password.replace(/[0-9]/g, '').length >=
      this.#config.minNumber;
    this.#status.minSpecial =
      password.length -
        password.replace(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g, '').length >=
      this.#config.minSpecial;
    return (this.#status.isValid =
      this.#status.minCharacters &&
      this.#status.minUpper &&
      this.#status.minLower &&
      this.#status.minNumber &&
      this.#status.minSpecial);
  }

  constructor(config?: Partial<InputPasswordValidatorConfig>) {
    super();
    this.#config = {
      minCharacters: 8,
      minUpper: 1,
      minLower: 1,
      minNumber: 1,
      minSpecial: 1,
      ...config,
    };
  }

  override get status(): InputPasswordValidatorStatus {
    return { ...this.#status };
  }
}

export type InputConfirmValidatorStatus = InputValidatorStatus;

export class InputConfirmValidator extends InputValidator {
  #status: InputConfirmValidatorStatus = {
    isValid: false,
  };

  override isValid(value: string, confirm: string): boolean {
    if (!value && !confirm) return true;
    return (this.#status.isValid = value === confirm);
  }

  constructor() {
    super();
  }

  override get status(): InputEmailValidatorStatus {
    return { ...this.#status };
  }
}

export type InputEmailValidatorStatus = InputValidatorStatus;

export class InputEmailValidator extends InputValidator {
  #status: InputEmailValidatorStatus = {
    isValid: false,
  };

  override isValid(email: string): boolean {
    return (this.#status.isValid = Boolean(
      email
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        ),
    ));
  }

  constructor() {
    super();
  }

  override get status(): InputEmailValidatorStatus {
    return { ...this.#status };
  }
}

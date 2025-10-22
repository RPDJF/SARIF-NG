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

export interface InputPasswordValidatorStatus {
  minUpper: boolean;
  minLower: boolean;
  minSpecial: boolean;
  minNumber: boolean;
  minCharacters: boolean;
}

export abstract class InputValidator {
  abstract isValid(value: string): boolean;
}

export class InputPasswordValidator extends InputValidator {
  #config: InputPasswordValidatorConfig;
  #minUpper: boolean = false;
  #minLower: boolean = false;
  #minSpecial: boolean = false;
  #minNumber: boolean = false;
  #minCharacters: boolean = false;
  override isValid(password: string): boolean {
    this.#minCharacters = password.length < this.#config.minCharacters;
    this.#minUpper =
      password.length - password.replace(/[A-Z]/g, '').length <
      this.#config.minUpper;
    this.#minLower =
      password.length - password.replace(/[a-z]/g, '').length <
      this.#config.minLower;
    this.#minNumber =
      password.length - password.replace(/[0-9]/g, '').length <
      this.#config.minNumber;
    this.#minSpecial =
      password.length -
        password.replace(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g, '').length <
      this.#config.minSpecial;
    return (
      this.minCharacters &&
      this.minUpper &&
      this.minLower &&
      this.minNumber &&
      this.minSpecial
    );
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

  get minUpper() {
    return this.#minUpper;
  }
  get minLower() {
    return this.#minLower;
  }
  get minSpecial() {
    return this.#minSpecial;
  }
  get minNumber() {
    return this.#minNumber;
  }
  get minCharacters() {
    return this.#minCharacters;
  }
}

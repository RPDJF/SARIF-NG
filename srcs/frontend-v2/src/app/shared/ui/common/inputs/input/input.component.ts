import {
  Component,
  computed,
  effect,
  forwardRef,
  input,
  model,
  OnInit,
  output,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { I18nPipe } from '../../../../../core/pipes/i18n/i18n.pipe';
import {
  InputPasswordValidator,
  InputPasswordValidatorConfig,
  InputPasswordValidatorStatus,
  InputValidator,
} from './input.component.types';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [I18nPipe],
  templateUrl: './input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
  encapsulation: ViewEncapsulation.None,
})
export class InputComponent implements ControlValueAccessor, OnInit {
  label = input<string>();
  placeholder = input<string>();
  type = input<'text' | 'email' | 'password'>('text');
  name = input<string>();
  required = input<boolean | string>();
  disabled = input<boolean>(false);
  disabledSignal = signal<boolean>(false);

  inputPasswordValidatorConfig = input<Partial<InputPasswordValidatorConfig>>();
  inputPasswordValidatorConfigSignal = computed(() => {
    let config: InputPasswordValidatorConfig = {
      minCharacters: 8,
      minUpper: 1,
      minLower: 1,
      minNumber: 1,
      minSpecial: 1,
    };
    let inputConfig = this.inputPasswordValidatorConfig();
    if (inputConfig) config = { ...config, ...inputConfig };
    return config;
  });
  validator = input<InputValidator>();
  validatorSignal = signal<InputValidator | undefined>(undefined);
  validatorResult = computed(() => {
    if (this.type() === 'password') {
      const validator = this.validatorSignal() as InputPasswordValidator;
      const value = this.value();
      const config = this.inputPasswordValidatorConfigSignal();
      return {
        minCharacters: validator.minCharacters,
        minUpper: validator.min
        minLower:
          value.length - value.replace(/[a-z]/g, '').length < config.minLower,
        minNumber:
          value.length - value.replace(/[0-9]/g, '').length < config.minNumber,
        minSpecial:
          value.length -
            value.replace(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g, '').length <
          config.minSpecial,
      } as InputPasswordValidatorStatus;
    }
    return undefined;
  });
  value = model<string>('');
  validChange = output<boolean>();

  isTriggered = signal(false);

  valid = computed(() => {
    const validator = this.validatorSignal();
    if (!validator) return true;
    const value = this.value();

    console.log(validator);
    if (this.required() && !value.trim()) return false;
    const isValid = validator.isValid;
    return isValid;
  });

  validView = computed(() => {
    if (!this.isTriggered()) return true;
    return this.valid();
  });

  /* -- INIT INPUT --  */

  #loadDefaultValidator(): InputValidator | undefined {
    switch (this.type()) {
      case 'email':
        return undefined;
      case 'password':
        return new InputPasswordValidator();
    }
    return undefined;
  }

  ngOnInit(): void {
    this.disabledSignal.set(this.disabled());
    const validator = this.#loadDefaultValidator();
    this.validatorSignal.set(this.validator() || validator);
  }

  constructor() {
    effect(() => {
      let validator = this.validatorSignal();
      if (validator) this.validChange.emit(validator.isValid(this.value()));
    });
  }

  /* -- DEFAULT VALIDATORS -- */

  #emailValidator(text: string) {
    return Boolean(
      text
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        ),
    );
  }

  #passwordValidator(text: string) {
    const config = this.inputPasswordValidatorConfigSignal();

    switch (typeof this.validatorResult()) {
      case InputPasswordValidatorStatus:
    }
  }

  /* -- INPUT WRAPPERS -- */

  #onChange = (val: string) => {
    if (!this.isTriggered()) this.isTriggered.set(true);
  };
  #onTouched = () => {}; // maybe need to bind ?

  writeValue(val: string) {
    this.value.set(val);
  }

  registerOnChange(fn: any) {
    this.#onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.#onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabledSignal.set(isDisabled);
  }

  handleInput(val: string) {
    this.value.set(val);
    this.#onChange(val);
  }
}

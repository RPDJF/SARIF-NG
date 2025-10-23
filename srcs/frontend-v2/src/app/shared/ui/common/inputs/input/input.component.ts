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
import { InputTooltipComponent } from './components/input-tooltip/input-tooltip.component';
import {
  InputConfirmValidator,
  InputEmailValidator,
  InputPasswordValidator,
  InputPasswordValidatorConfig,
  inputType,
  InputValidator,
  InputValidatorStatus,
} from './input.component.types';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [InputTooltipComponent],
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
  /* -- IO and related signals -- */

  label = input<string>();
  placeholder = input<string>();
  type = input<inputType>('text');
  typeNormalize = computed(() => {
    switch (this.type()) {
      case 'username':
        return 'text';
      case 'confirm_password':
        return 'password';
      case 'confirm_email':
        return 'email';
    }
    if (this.type() === 'username') return 'text';
    return this.type();
  });
  name = input<string>();
  required = input<boolean | string>();
  disabled = input<boolean>(false);
  disabledSignal = signal<boolean>(false);
  autocomplete = input<boolean | undefined>(undefined);
  autocompleteComputed = computed(() => {
    const autocomplete = this.autocomplete();
    if (autocomplete !== undefined) return autocomplete;
    switch (this.type()) {
      case 'username':
      case 'email':
        return false;
    }
    return true;
  });
  confirmValue = input<string | undefined>(undefined);
  value = model<string>('');
  validChange = output<boolean>();

  /* other signals -- */
  isTriggered = signal(false);

  focus = signal(false);

  /* -- VALIDATORS -- */

  // CONFIGS
  inputPasswordValidatorConfig = input<Partial<InputPasswordValidatorConfig>>();
  inputPasswordValidatorConfigSignal = computed(() => {
    if (this.type() !== 'password') return undefined;
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
  // VALIDATORS
  validator = input<InputValidator>();
  validatorSignal = signal<InputValidator | undefined>(undefined);
  validatorResult = computed<InputValidatorStatus>(() => {
    this.value();
    const validator = this.validatorSignal();
    if (!validator) return { isValid: false };
    validator.isValid(this.value());
    return validator.status;
  });
  // VALIDATOR RESULTS
  valid = computed(() => {
    const validator = this.validatorSignal();
    if (!validator) return true;

    const value = this.value();
    if (this.required() && !value.trim()) return false;
    return this.confirmValue()
      ? validator.isValid(value, this.confirmValue())
      : validator.isValid(value);
  });

  isTriggeredComputed = computed(() => {
    const type = this.type();
    if (!this.isTriggered())
      return type === 'confirm_email' || type === 'confirm_password';
    return true;
  });

  showRedinput = computed(() => {
    return this.isTriggeredComputed() && !this.valid();
  });

  showTooltip = computed(() => {
    const type = this.type();
    if (
      !this.isTriggeredComputed() &&
      type !== 'confirm_email' &&
      type !== 'confirm_password'
    )
      return true;
    return this.valid() || !this.focus();
  });

  /* -- INIT INPUT --  */

  #loadDefaultValidator(): InputValidator | undefined {
    switch (this.type()) {
      case 'email':
        return new InputEmailValidator();
      case 'password':
        return new InputPasswordValidator();
      case 'confirm_email':
      case 'confirm_password':
        return new InputConfirmValidator();
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

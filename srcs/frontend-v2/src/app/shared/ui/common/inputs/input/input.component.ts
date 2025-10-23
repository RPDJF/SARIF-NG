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
  InputEmailValidator,
  InputEmailValidatorStatus,
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
  /* -- IO and related signals -- */

  label = input<string>();
  placeholder = input<string>();
  type = input<'text' | 'email' | 'password' | 'username'>('text');
  typeNormalize = computed(() => {
    if (this.type() === 'username') return 'text';
    return this.type();
  });
  name = input<string>();
  required = input<boolean | string>();
  disabled = input<boolean>(false);
  disabledSignal = signal<boolean>(false);
  autocomplete = input(false);
  value = model<string>('');
  validChange = output<boolean>();

  isTriggered = signal(false);

  focus = model(false);

  /* other signals -- */
  triggeredOnce = signal(false);

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
  validatorResult = computed<
    InputPasswordValidatorStatus | InputEmailValidatorStatus | undefined
  >(() => {
    this.value();
    const validator = this.validatorSignal();
    if (!validator) return undefined;
    validator.isValid(this.value());
    return validator.status;
  });
  // VALIDATOR RESULTS
  valid = computed(() => {
    const validator = this.validatorSignal();
    if (!validator) return true;
    const value = this.value();

    if (this.required() && !value.trim()) return false;
    const isValid = validator.isValid(this.value());
    console.log(isValid);
    return isValid;
  });

  showTooltip = computed(() => {
    if (!this.isTriggered()) return true;
    return this.valid() || !this.focus();
  });

  /* -- INIT INPUT --  */

  #loadDefaultValidator(): InputValidator | undefined {
    switch (this.type()) {
      case 'email':
        return new InputEmailValidator();
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

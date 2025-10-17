import { Component, forwardRef, input, model, output, signal, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [],
  templateUrl: './input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    }
  ],
  encapsulation: ViewEncapsulation.None,
})
export class InputComponent implements ControlValueAccessor {

  label = input<string>();
  placeholder = input<string>();
  type = input<'text' | 'email' | 'password'>('text');
  name = input<string>();
  required = input<boolean | string>();
  disabled = input<boolean>(false);
  disabledSignal = signal<boolean>(false);
  value = model<string>('');

  private onChange = (val: string) => {};
  private onTouched = () => {}; // maybe need to bind ?

  constructor() {
    this.disabledSignal.set(this.disabled());
  }

  writeValue(val: string) {
    this.value.set(val);
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabledSignal.set(isDisabled);
  }

  handleInput(val: string) {
    this.value.set(val);
    this.onChange(val);
  }
}

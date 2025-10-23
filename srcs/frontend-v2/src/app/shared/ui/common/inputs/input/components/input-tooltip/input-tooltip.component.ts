import { Component, HostBinding, input } from '@angular/core';
import { I18nPipe } from '../../../../../../../core/pipes/i18n/i18n.pipe';
import {
  InputPasswordValidatorConfig,
  inputType,
  InputValidatorStatus,
} from '../../input.component.types';

@Component({
  selector: 'app-input-tooltip',
  standalone: true,
  imports: [I18nPipe],
  templateUrl: './input-tooltip.component.html',
})
export class InputTooltipComponent {
  // TODO: Use angular overlay to position, remove hidden and xl: prefixes when ready
  @HostBinding('class') hostClass =
    'hidden xl:block xl:absolute -right-[415px]';

  type = input.required<inputType>();
  passwordConfig = input<InputPasswordValidatorConfig>();
  validatorResult = input.required<InputValidatorStatus>();
}

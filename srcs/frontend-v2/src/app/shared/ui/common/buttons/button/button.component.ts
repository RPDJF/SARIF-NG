import { Component, input, output } from '@angular/core';
import { I18nPipe } from '../../../../../core/pipes/i18n/i18n.pipe';
import { TranslationKey } from '../../../../../core/state/i18n/i18n.state.types';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [I18nPipe],
  templateUrl: './button.component.html',
})
export class ButtonComponent {
  public title = input.required<TranslationKey>();
  public icon = input<string>();

  public href = input();
  public click = output();
}

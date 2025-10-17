import { Component, computed, inject, input, output } from '@angular/core';
import { TranslationKey } from '../../../../../state/i18n/i18n.state.types';
import { I18nPipe } from '../../../../../core/pipes/i18n/i18n.pipe';

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

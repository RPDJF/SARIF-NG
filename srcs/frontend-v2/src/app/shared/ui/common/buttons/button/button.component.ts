import { Component, computed, inject, input, output } from '@angular/core';
import { Store } from '@ngxs/store';
import { I18nState } from '../../../../../state/i18n/i18n.state';
import { TranslationKey } from '../../../../../state/i18n/i18n.state.types';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
})
export class ButtonComponent {
  private readonly store = inject(Store);

  public title = input.required<TranslationKey>();
  public icon = input<string>();

  public titleTranslated = computed(
    () => this.store.selectSignal(I18nState.getI18n)()[this.title()],
  );

  public href = input();
  public click = output();
}

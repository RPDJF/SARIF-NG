import { Component, inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { I18nState } from '../../../../../state/i18n/i18n.state';

@Component({
  selector: 'app-pong-panel',
  standalone: true,
  imports: [],
  templateUrl: './pong-panel.component.html',
})
export class PongPanelComponent {
  private readonly store = inject(Store);

  public readonly i18n = this.store.selectSignal(I18nState.getI18n);
}

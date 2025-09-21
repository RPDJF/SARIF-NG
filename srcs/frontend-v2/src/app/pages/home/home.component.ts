import { Component, inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { I18nState } from '../../state/i18n/i18n.state';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  private readonly store = inject(Store);
  public readonly i18n = this.store.selectSignal(I18nState.getI18n);
}

import { Component, inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { I18nState } from '../../state/i18n/i18n.state';
import { I18nPipe } from '../../core/pipes/i18n/i18n.pipe';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [I18nPipe],
  templateUrl: './home.component.html',
})
export class HomeComponent {}

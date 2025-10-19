import { Component, output } from '@angular/core';
import { I18nPipe } from '../../../../core/pipes/i18n/i18n.pipe';

@Component({
  selector: 'app-google-signin-button',
  standalone: true,
  imports: [I18nPipe],
  templateUrl: './google-signin-button.component.html',
})
export class GoogleSigninButtonComponent {
  click = output();
}

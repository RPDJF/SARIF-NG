import { Component } from '@angular/core';
import { I18nPipe } from '../../core/pipes/i18n/i18n.pipe';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [I18nPipe],
  templateUrl: './home.component.html',
})
export class HomeComponent {}

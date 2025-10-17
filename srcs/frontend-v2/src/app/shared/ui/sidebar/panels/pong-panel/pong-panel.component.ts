import { Component, inject } from '@angular/core';
import { I18nPipe } from '../../../../../core/pipes/i18n/i18n.pipe';

@Component({
  selector: 'app-pong-panel',
  standalone: true,
  imports: [I18nPipe],
  templateUrl: './pong-panel.component.html',
})
export class PongPanelComponent {}

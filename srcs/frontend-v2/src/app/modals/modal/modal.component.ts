import { NgComponentOutlet } from '@angular/common';
import { Component, input, output, Type } from '@angular/core';
import { I18nPipe } from '../../core/pipes/i18n/i18n.pipe';
import { TranslationKey } from '../../state/i18n/i18n.state.types';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [NgComponentOutlet, I18nPipe],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  componentChild = input.required<Type<any>>();
  title = input<TranslationKey>();
  icon = input<string>();
  data = input();
  closed = output();

  public close() {
    this.closed.emit();
  }
}

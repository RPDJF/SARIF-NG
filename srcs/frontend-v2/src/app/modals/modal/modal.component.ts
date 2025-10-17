import {
  Component,
  computed,
  createComponent,
  EnvironmentInjector,
  inject,
  input,
  output,
  Type,
} from '@angular/core';
import { NgComponentOutlet } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [NgComponentOutlet],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  componentChild = input.required<Type<any>>();
  data = input();
  closed = output();

  public close() {
    this.closed.emit();
  }
}

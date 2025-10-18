import { Component, output, OutputEmitterRef } from '@angular/core';

@Component({
  selector: 'app-modal-child',
  standalone: true,
  template: '',
})
export abstract class ModalChildComponent {
  abstract submit: OutputEmitterRef<any>;
  close = output();

  closeModal(): void {
    this.close.emit();
  }
}

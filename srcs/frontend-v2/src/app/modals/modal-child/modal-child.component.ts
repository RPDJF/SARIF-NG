import {
  Component,
  InputSignal,
  output,
  OutputEmitterRef,
} from '@angular/core';

@Component({
  selector: 'app-modal-child',
  standalone: true,
  template: '',
})
export abstract class ModalChildComponent {
  abstract submit: OutputEmitterRef<any>;
  abstract data: InputSignal<any>;
  close = output();
}

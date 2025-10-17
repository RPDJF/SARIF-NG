import {
  Injectable,
  ApplicationRef,
  EnvironmentInjector,
  createComponent,
  ComponentRef,
  inject
} from '@angular/core';
import { ModalComponent } from '../../../modals/modal/modal.component';

@Injectable({
  providedIn: 'root'
})

export class ModalService {
  #appRef = inject(ApplicationRef);
  #envInjector = inject(EnvironmentInjector);

  open(component: any, data?: any): void {
    const modalRef: ComponentRef<ModalComponent> = createComponent(ModalComponent, {
      environmentInjector: this.#envInjector
    });

    modalRef.setInput('componentChild', component);
    modalRef.setInput('data', data);

    const domElem = modalRef.location.nativeElement;
    document.body.appendChild(domElem);
    this.#appRef.attachView(modalRef.hostView);

    modalRef.instance.closed.subscribe(() => {
      this.#appRef.detachView(modalRef.hostView);
      domElem.remove();
    });
  }
}

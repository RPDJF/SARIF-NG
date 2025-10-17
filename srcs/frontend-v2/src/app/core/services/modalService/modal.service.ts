import {
  ApplicationRef,
  ComponentRef,
  EnvironmentInjector,
  Injectable,
  createComponent,
  inject,
} from '@angular/core';
import { ModalComponent } from '../../../modals/modal/modal.component';
import { modalServiceOpenProp } from './modal.service.types';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  #appRef = inject(ApplicationRef);
  #envInjector = inject(EnvironmentInjector);

  open({ component, data, title, icon }: modalServiceOpenProp): void {
    const modalRef: ComponentRef<ModalComponent> = createComponent(
      ModalComponent,
      {
        environmentInjector: this.#envInjector,
      },
    );

    modalRef.setInput('componentChild', component);
    modalRef.setInput('data', data);
    modalRef.setInput('title', title);
    modalRef.setInput('icon', icon);

    const domElem = modalRef.location.nativeElement;
    document.body.appendChild(domElem);
    this.#appRef.attachView(modalRef.hostView);

    modalRef.instance.closed.subscribe(() => {
      this.#appRef.detachView(modalRef.hostView);
      domElem.remove();
    });
  }
}

import {
  ApplicationRef,
  ComponentRef,
  EnvironmentInjector,
  Injectable,
  createComponent,
  inject,
} from '@angular/core';
import { ModalChildComponent } from '../../../modals/modal-child/modal-child.component';
import { ModalComponent } from '../../../modals/modal/modal.component';
import { modalServiceOpenProp } from './modal.service.types';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  #appRef = inject(ApplicationRef);
  #envInjector = inject(EnvironmentInjector);

  open<T extends ModalChildComponent>({
    component,
    data,
    title,
    icon,
  }: modalServiceOpenProp<T>): ComponentRef<T> {
    const modalRef = createComponent(ModalComponent<T>, {
      environmentInjector: this.#envInjector,
    });
    modalRef.setInput('icon', icon);
    modalRef.setInput('title', title);

    const childRef = createComponent<T>(component, {
      environmentInjector: this.#envInjector,
    });
    modalRef.setInput('childRef', childRef);

    if (data) childRef.setInput('data', data);

    childRef.instance.close.subscribe(modalRef.instance.close.emit);

    const viewContainer =
      modalRef.location.nativeElement.querySelector('.modal-body');
    viewContainer.appendChild(childRef.location.nativeElement);
    this.#appRef.attachView(childRef.hostView);

    modalRef.instance.close.subscribe(() => {
      this.#appRef.detachView(modalRef.hostView);
      this.#appRef.detachView(childRef.hostView);
      modalRef.location.nativeElement.remove();
    });

    document.body.appendChild(modalRef.location.nativeElement);
    this.#appRef.attachView(modalRef.hostView);

    return childRef;
  }
}

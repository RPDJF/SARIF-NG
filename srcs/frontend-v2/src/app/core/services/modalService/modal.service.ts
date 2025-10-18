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
  #modalRef: ComponentRef<ModalComponent<any>> | undefined;
  #modalChildRef: ComponentRef<any> | undefined;
  #appRef = inject(ApplicationRef);
  #envInjector = inject(EnvironmentInjector);

  #removeModal() {
    if (this.#modalRef) {
      this.#appRef.detachView(this.#modalRef.hostView);
      this.#appRef.detachView(this.#modalChildRef!.hostView);
      this.#modalRef.location.nativeElement.remove();
      this.#modalRef = undefined;
    }
  }

  #replaceModal<T extends ModalChildComponent>(
    modalRef: ComponentRef<ModalComponent<T>>,
  ) {
    this.#removeModal();
    this.#modalRef = modalRef;
    this.#modalChildRef = modalRef.instance.childRef();
  }

  open<T extends ModalChildComponent>({
    component,
    data,
    title,
    icon,
  }: modalServiceOpenProp<T>): ComponentRef<T> {
    // build modals
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

    // handle modal closing
    childRef.instance.close.subscribe(() => {
      this.#removeModal();
    });
    modalRef.instance.close.subscribe(() => {
      this.#removeModal();
    });

    // replace current modal if exists
    this.#replaceModal(modalRef);

    // render modal
    const viewContainer =
      modalRef.location.nativeElement.querySelector('.modal-body');
    viewContainer.appendChild(childRef.location.nativeElement);
    this.#appRef.attachView(childRef.hostView);
    document.body.appendChild(modalRef.location.nativeElement);
    this.#appRef.attachView(modalRef.hostView);

    return childRef;
  }
}

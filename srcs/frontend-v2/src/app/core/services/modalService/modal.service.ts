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
  #modalChildRef: ComponentRef<any> | undefined;
  #appRef = inject(ApplicationRef);
  #envInjector = inject(EnvironmentInjector);
  #modalRef: ComponentRef<ModalComponent> = createComponent(ModalComponent, {
    environmentInjector: this.#envInjector,
  });

  #removeModal() {
    if (this.#modalRef) {
      this.#appRef.detachView(this.#modalRef.hostView);
      if (this.#modalChildRef)
        this.#appRef.detachView(this.#modalChildRef.hostView);
      this.#modalRef?.location.nativeElement.remove();
      this.#modalChildRef = undefined;
    }
  }

  #attachChildModal<T extends ModalChildComponent>(childRef: ComponentRef<T>) {
    if (!this.#modalRef) throw Error('Missing modal ref');
    childRef.instance.close.subscribe(() => {
      this.#removeModal();
    });

    // render modal
    const viewContainer =
      this.#modalRef.location.nativeElement.querySelector('.modal-body');
    viewContainer.appendChild(childRef.location.nativeElement);
    this.#appRef.attachView(childRef.hostView);
    this.#appRef.attachView(this.#modalRef.hostView);
    if (!this.#modalChildRef)
      document.body.appendChild(this.#modalRef.location.nativeElement);
    this.#modalChildRef = childRef;
  }

  #replaceModal<T extends ModalChildComponent>(childRef: ComponentRef<T>) {
    if (this.#modalChildRef) {
      this.#appRef.detachView(this.#modalChildRef.hostView);
      this.#modalChildRef.location.nativeElement.remove();
      this.#modalChildRef.destroy();
    }
    this.#attachChildModal(childRef);
  }

  open<T extends ModalChildComponent>({
    component,
    data,
    title,
    icon,
  }: modalServiceOpenProp<T>): ComponentRef<T> {
    // build modals
    this.#modalRef.setInput('icon', icon);
    this.#modalRef.setInput('title', title);
    const childRef = createComponent<T>(component, {
      environmentInjector: this.#envInjector,
    });
    if (data) childRef.setInput('data', data);

    // handle modal closing
    this.#modalRef.instance.close.subscribe(() => {
      this.#removeModal();
    });

    // replace current modal if exists
    this.#replaceModal(childRef);

    return childRef;
  }
}

import { isPlatformBrowser } from '@angular/common';
import {
  ApplicationRef,
  createComponent,
  EnvironmentInjector,
  inject,
  Injectable,
  PLATFORM_ID,
} from '@angular/core';
import { NotificationComponent } from '../../../shared/ui/notifications/notification/notification.component';
import { NotificationServiceProp } from './notification.service.types';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  #platformId = inject(PLATFORM_ID);
  #appRef = inject(ApplicationRef);
  #environmentInjector = inject(EnvironmentInjector);

  showNotification({
    body,
    icon,
    loading,
    title,
    type,
  }: NotificationServiceProp) {
    const notificationComponent = createComponent(NotificationComponent, {
      environmentInjector: this.#environmentInjector,
    });

    if (type) notificationComponent.setInput('type', type);
    if (title) notificationComponent.setInput('title', title);
    if (icon) notificationComponent.setInput('icon', icon);
    if (loading) notificationComponent.setInput('loading', loading);
    if (body) notificationComponent.setInput('body', body);

    notificationComponent.instance.close.subscribe(() => {
      this.#appRef.detachView(notificationComponent.hostView);
      notificationComponent.location.nativeElement.remove();
    });

    this.#appRef.attachView(notificationComponent.hostView);
    if (isPlatformBrowser(this.#platformId))
      document.body.appendChild(notificationComponent.location.nativeElement);
  }
}

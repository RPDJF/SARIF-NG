import {
  AfterViewInit,
  Component,
  computed,
  input,
  output,
  signal,
} from '@angular/core';
import { NotificationType } from '../../../../core/services/notificationService/notification.service.types';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [],
  templateUrl: './notification.component.html',
})
export class NotificationComponent implements AfterViewInit {
  type = input<NotificationType>('information');
  title = input<string>(this.type());
  icon = input<string>();
  loading = input(false);
  body = input<string>('');

  iconComputed = computed(() => {
    const icon = this.icon();
    if (icon) return icon;
    return this.#getDefaultIcon(this.type());
  });
  init = signal(false);
  closing = signal(false);

  close = output();

  #getDefaultIcon(notificationType: NotificationType) {
    switch (notificationType) {
      default:
      case 'information':
      case 'loading':
      case 'success':
      case 'warning':
      case 'error':
        return 'assets/ui/notification/error-16-svgrepo-com.svg';
    }
  }

  ngAfterViewInit(): void {
    requestAnimationFrame(() => {
      setTimeout(() => {
        this.closing.set(true);
        setTimeout(() => {
          this.close.emit();
        }, 200);
      }, 5000);
      this.init.set(true);
    });
  }
}

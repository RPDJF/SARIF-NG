export type NotificationType =
  | 'success'
  | 'loading'
  | 'information'
  | 'warning'
  | 'error';

export interface NotificationServiceProp {
  type?: NotificationType;
  title?: string;
  icon?: string;
  body?: string;
  loading?: boolean;
}

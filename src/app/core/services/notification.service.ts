import { Injectable, signal } from '@angular/core';

export interface Notification {
  message: string;
  type: 'success' | 'error' | 'info';
  id: number;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notifications = signal<Notification[]>([]);
  
  getNotifications() {
    return this.notifications;
  }

  showError(message: string) {
    this.addNotification({
      message,
      type: 'error',
      id: Date.now()
    });
  }

  showSuccess(message: string) {
    this.addNotification({
      message,
      type: 'success',
      id: Date.now()
    });
  }

  showInfo(message: string) {
    this.addNotification({
      message,
      type: 'info',
      id: Date.now()
    });
  }

  private addNotification(notification: Notification) {
    this.notifications.update(notifications => [...notifications, notification]);
    setTimeout(() => {
      this.removeNotification(notification.id);
    }, 5000);
  }

  private removeNotification(id: number) {
    this.notifications.update(notifications => 
      notifications.filter(notification => notification.id !== id)
    );
  }
} 
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

export interface Notification {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationSubject = new Subject<Notification>();

  constructor() {}

  sendNotification(type: 'success' | 'error' | 'warning' | 'info', message: string) {
    this.notificationSubject.next({ type, message });
  }

  getNotifications(): Observable<Notification> {
    return this.notificationSubject.asObservable();
  }
}
import { Component, OnInit } from '@angular/core';
import { NotificationService, Notification } from './notification.service';
import { CommonModule} from '@angular/common';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  notifications: Notification[] = [];

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.notificationService.getNotifications().subscribe(notification => {
      this.notifications.push(notification);
      setTimeout(() => {
        this.notifications.shift();
      }, 5000); // Auto-dismiss after 5 seconds
    });
  }

  closeNotification(index: number) {
    this.notifications.splice(index, 1);
  }
}



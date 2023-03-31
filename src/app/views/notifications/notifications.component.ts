import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  archived: any
  componentSelect: any = false
  notifications: any = []
  selectedNotifications: any = []
  date: any

  constructor(private db: ProductService) { }

  ngOnInit(): void {
    this.getNotifications()
    this.archivedNotifications()
  }

  getNotifications() {
    this.db.getNotifications().subscribe((res: any) => {
      this.notifications = res.docs.map((doc: any) => {
        return doc.data()
      })

      this.notifications = this.notifications.sort((a: any, b: any) => {
        const d: any = new Date(a.date);
        const c: any = new Date(b.date);
        return c - d;
      })

      this.notificationDate()
    })
  }

  notificationDate() {
    const date = new Date()

    this.notifications.forEach((element: any) => {
      const messageDate = new Date(element.date)

      switch (date.getDate() == messageDate.getDate()) {
        case true:
          let hour: any = messageDate.getHours()
          let minutes: any = messageDate.getMinutes()

          hour = hour < 10 ? `0${hour}` : hour
          minutes = minutes < 10 ? `0${minutes}` : minutes

          element.date = `${hour}:${minutes}`
          break;

        case false:
          let day: any = messageDate.getDate()
          let mounth: any = messageDate.getMonth() + 1

          day = day < 10 ? `0${day}` : day
          mounth = mounth < 10 ? `0${mounth}` : mounth

          element.date = `${day}/${mounth}/${messageDate.getFullYear()}`
          break;

        default:
          element.date = null
          break;
      }

    });
  }

  archivedNotifications() {
    this.db.getArchivedNotification().subscribe((res: any) => {
      this.archived = res.docs.map((doc: any) => {
        return doc.data()
      })
    })
  }

  checkNotification(checkedNotification: any) {
    if (checkedNotification.new === true) {
      this.db.getNotifications().subscribe((res: any) => {

        const notifications = res.docs.map((doc: any) => {
          return doc.data()
        })

        const filter = notifications.filter((notification: any) => {
          return notification.id === checkedNotification.id
        })

        filter[0].new = false

        this.db.getNotificationId(checkedNotification)

        setTimeout(() => {
          this.db.updateNotificationStatus(filter[0], this.db.productId)
            .then(() => this.getNotifications())
        }, 500);
      })
    }
  }

  archiveNotification(notification: any, event: Event) {
    event.stopPropagation()

    this.db.getNotificationId(notification)

    setTimeout(() => {
      this.db.archiveNotification(notification)
        .then(() => this.deleteNotification(this.db.productId))
        .then(() => this.getNotifications())
    }, 500);
  }

  unarchiveNotification(notification: any, event: any) {
    event.stopPropagation()

    this.db.getArchivedNotificationId(notification)

    setTimeout(() => {
      this.db.unachiveNotification(notification, this.db.productId)
        .then(() => this.archivedNotifications())
    }, 500);
  }

  deleteNotification(notification: any, event?: any) {
    event.stopPropagation()

    this.db.getNotificationId(notification)

    setTimeout(() => {
      this.db.deleteNotification(this.db.productId)
        .then(() => this.getNotifications())
    }, 500);
  }

  selectedNotification(id: any) {
    this.selectedNotifications.push(id)

    console.log(this.selectedNotifications)
  }
  
}

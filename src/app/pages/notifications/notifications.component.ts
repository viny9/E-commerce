import { Component, OnInit } from '@angular/core';
import { AdminRoutes } from 'src/app/shared/enums/admin-routes';
import { Notification } from 'src/app/shared/interfaces/Notification';
import { LoadService } from 'src/app/services/load/load.service';
import { ProductService } from 'src/app/core/services/product/product.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  archived: any
  componentSelect: any = false
  notifications: Notification[] = []
  selectedNotifications: any = []
  date: string = ''
  loading: boolean = false

  constructor(private db: ProductService, private loadService: LoadService) {
    loadService.isLoading.subscribe((res: any) => {
      this.loading = res
    })

    db.selectComponent = AdminRoutes.notifications
  }

  ngOnInit(): void {
    this.getNotifications()
    this.archivedNotifications()
  }

  getNotifications() {
    // this.loadService.showLoading()
    // this.db.getNotifications().subscribe((res: any) => {

    //   this.notifications = res.sort((a: any, b: any) => {
    //     const d: any = new Date(a.date);
    //     const c: any = new Date(b.date);
    //     return c - d;
    //   })

    //   this.notificationDate()
    //   this.loadService.hideLoading()
    // })
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
    // this.db.getArchivedNotification().subscribe((res: any) => {
    //   this.archived = res
    // })
  }

  checkNotification(checkedNotification: any) {
    // if (checkedNotification.new) {
    //   this.db.getNotifications().subscribe(async (res: any) => {

    //     const filter = res.filter((notification: any) => {
    //       return notification.id === checkedNotification.id
    //     })

    //     filter[0].new = false

    //     const id = await this.db.getNotificationId(checkedNotification)

    //     await this.db.updateNotificationStatus(filter[0], id)
    //     this.getNotifications()
    //   })
    // }
  }

  async archiveNotification(notification: any, event: Event) {
    // event.stopPropagation()

  //   const id = await this.db.getNotificationId(notification)

  //   await this.db.archiveNotification(notification)
  //   await this.db.deleteNotification(id)
  //   this.getNotifications()
  // }

  // async unarchiveNotification(notification: any, event: Event) {
  //   event.stopPropagation()

  //   const id = await this.db.getArchivedNotificationId(notification)

  //   await this.db.unachiveNotification(notification, id)
  //   this.archivedNotifications()
  }

  async deleteNotification(notification: any, event?: any) {
    // event?.stopPropagation()

    // const id = await this.db.getNotificationId(notification)

    // await this.db.deleteNotification(id)
    // this.getNotifications()
  }

  selectedNotification(id: any) {
    this.selectedNotifications.push(id)
    console.log(this.selectedNotifications)
  }

}

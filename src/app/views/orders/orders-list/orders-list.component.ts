import { MatPaginator } from '@angular/material/paginator';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from 'src/app/services/product/product.service';
import { LoadService } from 'src/app/services/load/load.service';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css']
})
export class OrdersListComponent implements AfterViewInit {

  dataSource: any
  columns: any = ['id', 'email', 'value', 'status', 'data', 'actions']
  priceTotal: any
  @ViewChild(MatPaginator) paginator: any;

  loading: any = false

  constructor(private db: ProductService, private loadService: LoadService) {
    loadService.isLoading.subscribe((res: any) => {
      this.loading = res
    })

    // Está dando o erro no rxjs 
    // Embora não esteja afetando o site
    db.selectComponent = 'orders'
  }

  ngAfterViewInit() {
    this.allOrders()
  }

  allOrders() {
    this.loadService.showLoading()
    this.db.getOrders().subscribe((res: any) => {
      this.dataSource = res.docs.map((doc: any) => {
        return doc.data()
      })

      this.dataSource = this.dataSource.sort((a: any, b: any) => {
        const d: any = new Date(a.created);
        const c: any = new Date(b.created);
        return c - d;
      })


      this.dataSource.paginator = this.paginator;

      this.notificationDate()
      this.paymentStatus()
      this.total()
      this.loadService.hideLoading()
    })
  }

  notificationDate() {
    const date = new Date()

    this.dataSource.forEach((element: any) => {
      const orderDate = new Date(element.created * 1000)

      switch (date.getDate() == orderDate.getDate()) {
        case true:
          let hour: any = orderDate.getHours()
          let minutes: any = orderDate.getMinutes()

          hour = hour < 10 ? `0${hour}` : hour
          minutes = minutes < 10 ? `0${minutes}` : minutes

          element.date = `${hour} : ${minutes}`
          break;

        case false:
          let day: any = orderDate.getDate()
          let mounth: any = orderDate.getMonth() + 1

          day = day < 10 ? `0${day}` : day
          mounth = mounth < 10 ? `0${mounth}` : mounth

          element.date = `${day}/${mounth}/${orderDate.getFullYear()}`
          break;

        default:
          element.date = null
          break;
      }

    });
  }

  paymentStatus() {
    this.dataSource.forEach((element: any) => {

      if (element.payment_intent.status === 'succeeded') {
        element.payment_intent.status = 'Pago'
      } else {
        element.payment_intent.status = 'Aguardando pagamento'
      }
    });
  }

  total() {
    this.dataSource.forEach((element: any) => {
      let total: any = 0
      for (let i = 0; i < element.products.length; i++) {
        const product = element.products[i];
        total += (product.price * product.amount) / 100
      }

      element.total = total
    });
  }
}

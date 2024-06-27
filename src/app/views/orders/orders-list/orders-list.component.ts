import { MatLegacyPaginator as MatPaginator } from '@angular/material/legacy-paginator';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ProductService } from 'src/app/services/product/product.service';
import { LoadService } from 'src/app/services/load/load.service';
import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';
import { MatSort } from '@angular/material/sort';
import { AdminRoutes } from 'src/app/enums/admin-routes';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css']
})
export class OrdersListComponent implements AfterViewInit {

  dataSource: any
  products!: Product[]
  columns: string[] = ['id', 'email', 'value', 'status', 'data', 'actions']
  priceTotal: number = 0
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  loading: boolean = false

  constructor(private db: ProductService, private loadService: LoadService) {
    db.selectComponent = AdminRoutes.orders
  }

  ngAfterViewInit() {
    this.allOrders()
  }

  allOrders() {
    // this.loadService.showLoading()

    // this.db.getOrders().subscribe((res) => {

    //   this.products = res.sort((a: any, b: any) => {
    //     const d: any = new Date(a.created);
    //     const c: any = new Date(b.created);
    //     return c - d;
    //   })

    //   this.dataSource = new MatTableDataSource(this.products)
    //   this.dataSource.paginator = this.paginator;
    //   this.dataSource.sort = this.sort

    //   this.notificationDate()
    //   this.paymentStatus()
    //   this.total()
    //   this.loadService.hideLoading()
    // })
  }

  notificationDate() {
    const date = new Date()

    this.products.forEach((element: any) => {
      const orderDate = new Date(element.created * 1000)

      switch (date.getDate() == orderDate.getDate()) {
        case true:
          let hour: string | number = orderDate.getHours()
          let minutes: string | number = orderDate.getMinutes()

          hour = hour < 10 ? `0${hour}` : hour
          minutes = minutes < 10 ? `0${minutes}` : minutes

          element.date = `${hour} : ${minutes}`
          break;

        case false:
          let day: string | number = orderDate.getDate()
          let mounth: string | number = orderDate.getMonth() + 1

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
    this.products.forEach((element: any) => {

      if (element.payment_intent.status === 'succeeded') {
        element.payment_intent.status = 'Pago'
      } else {
        element.payment_intent.status = 'Aguardando pagamento'
      }
    });
  }

  total() {
    this.products.forEach((element: any) => {
      let total: any = 0

      for (let i = 0; i < element.products.length; i++) {
        const product = element.products[i];
        total += (product.price * product.amount) / 100
      }

      element.total = total
    });
  }
}

import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/core/services/product/product.service';
import { LoadService } from 'src/app/services/load/load.service';
import { AdminRoutes } from 'src/app/shared/enums/admin-routes';

@Component({
  selector: 'app-order-infos',
  templateUrl: './order-infos.component.html',
  styleUrls: ['./order-infos.component.css']
})
export class OrderInfosComponent implements OnInit {

  orderInfos: any
  loading: boolean = false

  constructor(private db: ProductService, private loadService: LoadService, private router: ActivatedRoute) {
    loadService.isLoading.subscribe((res) => {
      this.loading = res
    })

    db.selectComponent = AdminRoutes.orders
  }

  ngOnInit(): void {
    this.getOrder()
  }

  getOrder() {
    this.loadService.showLoading()

    this.router.params.subscribe((param) => {
      const id = param['orderId']

      // this.db.getOrders().subscribe((res) => {

      //   const filter = res.filter((order: any) => {
      //     return order.id === id
      //   })

      //   this.orderInfos = filter[0]

      //   this.total()
      //   this.loadService.hideLoading()
      // })
    })
  }

  total() {
    let total: number = 0

    this.orderInfos.products.forEach((product: any) => {
      total += (product.price * product.amount) / 100

      this.orderInfos.total = total
    });
  }

  date(milliseconds: any) {
    const date = new Date(milliseconds * 1000)
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
  }

}

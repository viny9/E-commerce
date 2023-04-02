import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product/product.service';
import { LoadService } from 'src/app/services/load/load.service';

@Component({
  selector: 'app-order-infos',
  templateUrl: './order-infos.component.html',
  styleUrls: ['./order-infos.component.css']
})
export class OrderInfosComponent implements OnInit {

  orderInfos: any
  loading:any = false

  constructor(private db: ProductService, private loadService:LoadService, private router: ActivatedRoute) {
    loadService.isLoading.subscribe((res: any) => {
      this.loading = res
    })

    db.selectComponent = 'orders'
   }

  ngOnInit(): void {
    this.getOrder()
  }

  getOrder() {
    this.loadService.showLoading()
    this.router.params.subscribe((param: any) => {
      const id = param.orderId

      this.db.getOrders().subscribe((res: any) => {
        const orders = res.docs.map((doc: any) => {
          return doc.data()
        })

        const filter = orders.filter((order: any) => {
          return order.id === id
        })

        this.orderInfos = filter[0]

        this.total()
        this.loadService.hideLoading()
      })
    })
  }

  total() {
    let total: any = 0

    this.orderInfos.products.forEach((product: any) => {
      total += (product.price * product.amount) / 100

      this.orderInfos.total = total
    });
  }

  date(miliseconds:any) {
    const date = new Date(miliseconds * 1000)
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
  }

}

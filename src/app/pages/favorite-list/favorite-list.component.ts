import { Component, OnInit } from '@angular/core';
import { LoadService } from 'src/app/services/load/load.service';
import { ProductService } from 'src/app/core/services/product/product.service';

@Component({
  selector: 'app-favorite-list',
  templateUrl: './favorite-list.component.html',
  styleUrls: ['./favorite-list.component.css'],
})
export class FavoriteListComponent implements OnInit {

  empty = true
  list: any[] = []
  loading = false

  constructor(private db: ProductService, private loadService: LoadService) {
    loadService.isLoading.subscribe((res) => {
      this.loading = res
    })
  }

  ngOnInit(): void {
    this.getList()
  }

  getList() {
    this.loadService.showLoading()

    // this.db.getFavoriteList().subscribe((res) => {
    //   this.list = res;

    //   this.isEmpty()
    //   this.loadService.hideLoading()
    // })
  }

  isEmpty() {
    if (this.list.length === 0) {
      this.empty = true
    } else {
      this.empty = false
    }
  }

  async removeListProduct(product: Object) {
    // const id: any = await this.db.getId(this.db.path.list, product)

    // await this.db.deleteFromList(id)
    // this.getList()
  }

}

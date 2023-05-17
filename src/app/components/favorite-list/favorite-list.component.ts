import { Component, OnInit } from '@angular/core';
import { GetIdTypes } from 'src/app/enums/get-id-types';
import { LoadService } from 'src/app/services/load/load.service';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-favorite-list',
  templateUrl: './favorite-list.component.html',
  styleUrls: ['./favorite-list.component.css']
})
export class FavoriteListComponent implements OnInit {

  empty: any
  list: any = []
  loading: any = false

  constructor(private db: ProductService, private loadService: LoadService) {
    loadService.isLoading.subscribe((res: any) => {
      this.loading = res
    })
  }

  ngOnInit(): void {
    this.favoriteList()
  }

  favoriteList() {
    this.loadService.showLoading()
    this.db.getFavoriteList().subscribe((res: any) => {
      res.docs.forEach((element: any) => {
        this.list.push(element.data())
      });

      this.isEmpty()
    })
  }

  isEmpty() {
    if (this.list.length === 0) {
      this.empty = true
    } else {
      this.empty = false
    }

    this.loadService.hideLoading()
  }

  async remove(product: any) {
    const id:any = await this.db.getId(GetIdTypes.list, product)

    this.db.deleteFromList(id)
      .then(() => console.log('removido'))
      .then(() => window.location.reload())
  }

}

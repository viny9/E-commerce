import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-favorite-list',
  templateUrl: './favorite-list.component.html',
  styleUrls: ['./favorite-list.component.css']
})
export class FavoriteListComponent implements OnInit {

  empty: any
  list: any = []

  constructor(private db: ProductService) { }

  ngOnInit(): void {
    this.favoriteList()
  }

  isEmpty() {
    if (this.list.length === 0) {
      this.empty = true
    } else {
      this.empty = false
    }
  }

  favoriteList() {
    this.db.getFavoriteList().subscribe((res: any) => {
      res.docs.forEach((element: any) => {
        this.list.push(element.data())
      });

      this.isEmpty()
    })
  }

  remove(product: any) {
    this.db.getListProductId(product)

    setTimeout(() => {
      this.db.deleteFromList(this.db.productId)
        .then(() => console.log('removido'))
        .then(() => window.location.reload())
    }, 500);
  }

}

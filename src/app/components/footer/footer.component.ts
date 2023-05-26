import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  categorys: any[] = []

  constructor(private db: ProductService) { }

  ngOnInit(): void {
    this.getCategorys()
  }

  getCategorys() {
    this.db.getCategorys().subscribe((res) => {

      this.categorys = res.docs.map((doc) => {
        return doc.data()
      })

      this.categorys = this.categorys.sort((a: any, b: any) => {
        if (a.name > b.name) {
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        }

        return 0
      })
    })
  }

  // window.open("https://wa.me/" + 61984977155, "_blank");

}

import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/shared/models/category';
import { CategoryService } from 'src/app/core/services/category/category.service';
import { ProductService } from 'src/app/core/services/product/product.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  public categorys: Category[] = [];

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.getCategorys();
  }

  getCategorys() {
    this.categoryService.getCategorys().subscribe((res) => {
      this.categorys = res.sort((a: any, b: any) => {
        if (a.name > b.name) {
          return 1;
        }

        if (a.name < b.name) {
          return -1;
        }

        return 0;
      });
    });
  }

  // window.open("https://wa.me/" + 61984977155, "_blank");
}

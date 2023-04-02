import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LoadService } from 'src/app/services/load/load.service';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  editForm: any
  product: any
  categorys: any
  loading: any = false

  constructor(private db: ProductService, private loadService: LoadService, private route: ActivatedRoute) {
    loadService.isLoading.subscribe((res: any) => {
      this.loading = res
    })
  }

  ngOnInit(): void {
    this.getProduct()
    this.categoryList()
  }

  getProduct() {
    this.loadService.showLoading()

    this.route.params.subscribe((res: any) => {

      const id = res.productId

      this.db.getProductById(id).subscribe((res: any) => {
        this.product = res.data()
        this.createForm(this.product)
      })
    })
  }

  categoryList() {
    this.db.getCategorys().subscribe((res: any) => {

      const categorys = res.docs.map((doc: any) => {
        return doc.data()
      })

      this.categorys = categorys
      
      this.loadService.hideLoading()
    })
  }

  createForm(product?: any) {
    this.editForm = new FormGroup({
      name: new FormControl(product?.name),
      price: new FormControl(product?.price),
      category: new FormControl(product?.category),
      img: new FormControl(),
    })
  }

  updateProduct() {
    const product = this.editForm.value
    product.price = Number(product.price)

    this.route.params.subscribe((res: any) => {
      this.db.editProduct(res.productId, this.editForm.value)
        .then(() => this.db.navegate('admin/products'))
        .then(() => this.db.userMessages('Produto Editado'))
    })
  }

  teste2(event: Event) {

  }
  teste3(event: Event) {

  }

}

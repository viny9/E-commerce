import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private db: ProductService, private router: ActivatedRoute) { }

  products: any
  searchWord: any
  specialPriceFilter: any = {
    min: '',
    max: ''
  }

  ngOnInit(): void {
    this.getProducts()
  }


  getProducts() {
    this.router.params.subscribe((word: any) => {
      const searchWord = word.searchWord
      this.searchWord = searchWord

      this.db.getProducts().subscribe((res: any) => {

        const products = res.docs.map((res: any) => {
          return res.data()
        })

        const search = products.filter((product: any) => {
          console.log(product.name.toLowerCase())
          return product.name.toLowerCase().includes(searchWord.toLowerCase())
        })

        this.products = search
      })
    })
  }

  selectProduct(product: any) {
    this.db.getProductId(product)

    setTimeout(() => {
      this.db.navegate(`product/${this.db.productId}`)
    }, 500);

  }

  // filters(filters: any) {
  //   this.router.params.subscribe((word: any) => {
  //     const searchWord = word.searchWord

  //     this.db.getProducts().subscribe((res: any) => {

  //       const products = res.docs.map((res: any) => {
  //         return res.data()
  //       })

  //       const search = products.filter((product: any) => {
  //         return product.name.toLowerCase().includes(searchWord)
  //       })

  //       if (filters.price === true) {
  //         this.priceFilter(search, filters.min, filters.max)
  //       }

  //       if (filters.price === true && filters.specialPriceFilter) {
  //         this.priceFilter(search, filters.specialPriceFilter.min, filters.specialPriceFilter.max)
  //       }

  //       // if (checkboxStatus === false) {
  //       //   this.getProducts()  
  //       // }
  //     })
  //   })

  // }

  // priceFilter(products: any, min: any, max: any) {
  //   const filter = products.filter((product: any) => {
  //     return product.price >= min && product.price <= max
  //   })

  //   this.products = filter
  // }

  // categoryFilter(products: any, category: any) {
  //   const filter = products.filter((product: any) => {
  //     return product.category === category
  //   })

  //   this.products = filter
  // }

}

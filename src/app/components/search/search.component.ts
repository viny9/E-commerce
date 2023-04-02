import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadService } from 'src/app/services/load/load.service';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  products: any
  searchWord: any
  loading: any = false
  specialPriceFilter: any = {
    min: '',
    max: ''
  }

  constructor(private db: ProductService, private loadService: LoadService, private router: ActivatedRoute) {
    loadService.isLoading.subscribe((res: any) => {
      this.loading = res
    })
  }

  ngOnInit(): void {
    this.getProducts()
  }


  getProducts() {
    this.loadService.showLoading()

    this.router.params.subscribe((word: any) => {
      const searchWord = word.searchWord
      this.searchWord = searchWord

      this.db.getProducts().subscribe((res: any) => {

        const products = res.docs.map((res: any) => {
          return res.data()
        })

        const search = products.filter((product: any) => {
          return product.name.toLowerCase().includes(searchWord.toLowerCase())
        })

        this.products = search
        this.loadService.hideLoading()
      })
    })
  }

  selectProduct(product: any) {
    this.db.getProductId(product)

    setTimeout(() => {
      this.db.navegate(`product/${this.db.id}`)
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

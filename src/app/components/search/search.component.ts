import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadService } from 'src/app/services/load/load.service';
import { ProductService } from 'src/app/services/product/product.service';
import { userMessages } from 'src/app/utils/snackbar';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  public products: any;
  public searchWord: any;
  public loading: any = false;
  public selectedFilters: any = [];
  public screenSize: number = window.screen.width;
  private filtersOptions: any = [];
  private selected: any = -1;
  private filterProducts: any = [];

  dataSource = new MatTreeNestedDataSource();
  treeControl = new NestedTreeControl((node: any) => node.children);

  constructor(
    private db: ProductService,
    private loadService: LoadService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    loadService.isLoading.subscribe((res) => {
      this.loading = res;
    });

    this.filters();
  }

  hasChild = (_: number, node: any) =>
    !!node.children && node.children.length > 0;

  // Adicionar mais opções de filtro
  // Melhorar este código
  // Caso não tenha produtos por fato de filtro adicionar uma mensagem

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.loadService.showLoading();

    this.route.params.subscribe((word: any) => {
      const searchWord = word.searchWord;
      this.searchWord = searchWord;

      this.db.getProducts().subscribe((res: any) => {
        const search = res.filter((product: any) => {
          return product.name.toLowerCase().includes(searchWord.toLowerCase());
        });

        this.products = search;
        this.loadService.hideLoading();
      });
    });
  }

  filters() {
    this.filtersOptions = [
      {
        name: 'Preço',
        children: [
          {
            name: 'Até 100',
            type: 'price',
            checked: false,
            min: 0,
            max: 100,
          },

          {
            type: 'price',
            name: 'De 100 até 250',
            checked: false,
            min: 100,
            max: 250,
          },

          {
            type: 'price',
            name: 'De 250 até 500',
            checked: false,
            min: 250,
            max: 500,
          },

          {
            type: 'price',
            name: 'De 500 até 1000',
            checked: false,
            min: 500,
            max: 1000,
          },
        ],
      },

      {
        name: 'Categorias',
        children: [
          {
            name: 'teste',
            type: 'category',
            checked: false,
            value: 'teste',
          },
          {
            name: 'Eletronicos',
            type: 'category',
            checked: false,
            value: 'Eletronicos',
          },
          {
            name: 'Mouses',
            type: 'category',
            checked: false,
            value: 'Mouses',
          },
        ],
      },
    ];

    this.dataSource.data = this.filtersOptions;
  }

  async selectProduct(id: string) {
    this.router.navigate([`product/${id}`]);
  }

  selectedFilter(selectedFilter: any) {
    this.loadService.showLoading();

    this.selectedFilters.push(selectedFilter);

    const duplicateFilter = this.selectedFilters.filter((filter: any) => {
      return filter.name === selectedFilter.name;
    });

    const twoPriceFilter = this.selectedFilters.filter((filter: any) => {
      return filter.type === 'price';
    });

    if (duplicateFilter.length <= 1 && twoPriceFilter.length <= 1) {
      this.addFilter();

      if (this.products.length === 0) {
        this.getProducts();
      }
    } else if (twoPriceFilter.length > 1) {
      this.selectedFilters.pop();
      userMessages('Só pode usar um filtro de preço por vez.', this.snackBar);
    } else if (duplicateFilter.length > 1) {
      this.selectedFilters.pop();
      userMessages('Esse filtro já está em uso.', this.snackBar);
    }
  }

  addFilter() {
    this.route.params.subscribe((word: any) => {
      const searchWord = word.searchWord;

      this.db.getProducts().subscribe((res: any) => {
        let search = res.filter((product: any) => {
          return product.name.toLowerCase().includes(searchWord.toLowerCase());
        });

        const allProducts = search;

        for (let filter of this.selectedFilters) {
          if (filter.type === 'category') {
            // Remove os items duplicados do array
            this.filterProducts = this.filterProducts.filter(
              (value: any, index: any, self: any) =>
                index ===
                self.findIndex(
                  (t: any) => t.place === value.place && t.name === value.name
                )
            );

            search = allProducts.filter((product: any) => {
              return product.category === filter.name;
            });

            search.forEach((element: any) => {
              this.filterProducts.push(element);
            });

            search = this.filterProducts;
          } else if (filter.type === 'price') {
            search = search.filter(
              (value: any, index: any, self: any) =>
                index ===
                self.findIndex(
                  (t: any) => t.place === value.place && t.name === value.name
                )
            );

            search = search.filter((product: any) => {
              return product.price >= filter.min && product.price <= filter.max;
            });
          }
        }

        this.products = search;

        this.loadService.hideLoading();
      });
    });
  }

  removeFilter(filter: any) {
    const index = this.selectedFilters.findIndex(
      (i: any) => i.name === filter.name
    );
    this.selectedFilters.splice(index, 1);

    if (this.selectedFilters.length === 0) {
      this.getProducts();
    } else if (this.selectedFilters.length > 0) {
      this.loadService.showLoading();
      this.filterProducts = [];
      this.addFilter();
    }
  }
}

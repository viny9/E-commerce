import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  page:any = ''
  @ViewChild (MatPaginator) paginator: any ;
  columns:Array<String> = ['id', 'nome', 'preco', 'categorias', 'actions']
  teste:Array<object> = [
    // { id: 1, nome: 'Teclado mecanico redragon, switch brown', preco: 400.99, category: 'Eletronicos'},
    { id: 2, nome: 'Mouse', preco: 299.99, category: 'Eletronicos'},
    { id: 3, nome: 'Mouse', preco: 299.99, category: 'Eletronicos'},
    { id: 4, nome: 'Mouse', preco: 299.99, category: 'Eletronicos'},
    { id: 5, nome: 'Mouse', preco: 299.99, category: 'Eletronicos'},
    { id: 6, nome: 'Mouse', preco: 299.99, category: 'Eletronicos'},
    { id: 7, nome: 'Mouse', preco: 299.99, category: 'Eletronicos'},
    { id: 8, nome: 'Mouse', preco: 299.99, category: 'Eletronicos'},
    { id: 9, nome: 'Mouse', preco: 299.99, category: 'Eletronicos'},
    { id: 10, nome: 'Mouse', preco: 299.99, category: 'Eletronicos'},
    { id: 11, nome: 'Mouse', preco: 299.99, category: 'Eletronicos'},
    { id: 12, nome: 'Mouse', preco: 299.99, category: 'Eletronicos'},
    { id: 13, nome: 'Mouse', preco: 299.99, category: 'Eletronicos'},
    { id: 14, nome: 'Mouse', preco: 299.99, category: 'Eletronicos'},
    { id: 15, nome: 'Mouse', preco: 299.99, category: 'Eletronicos'},
  ]

  dataSource = new MatTableDataSource<any>(this.teste);

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
}

  recive(event:any) {
    this.page = event
  }

}

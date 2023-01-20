import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-product-crud',
  templateUrl: './product-crud.component.html',
  styleUrls: ['./product-crud.component.css']
})
export class ProductCrudComponent implements OnInit {

  teste2:any = false
  @ViewChild(MatPaginator) paginator: any ;
  columns:Array<String> = ['id', 'nome', 'preco', 'actions']
  teste:Array<object> = [
    { id: 1, nome: 'Teclado'},
    { id: 2, nome: 'Mouse', preco: 299},
    { id: 3, nome: 'Mouse', preco: 299},
    { id: 4, nome: 'Mouse', preco: 299},
    { id: 5, nome: 'Mouse', preco: 299},
    { id: 6, nome: 'Mouse', preco: 299},
    { id: 7, nome: 'Mouse', preco: 299},
    { id: 8, nome: 'Mouse', preco: 299},
    { id: 9, nome: 'Mouse', preco: 299},
    { id: 10, nome: 'Mouse', preco: 299},
    { id: 11, nome: 'Mouse', preco: 299},
    { id: 12, nome: 'Mouse', preco: 299},
    { id: 13, nome: 'Mouse', preco: 299},
    { id: 14, nome: 'Mouse', preco: 299},
    { id: 15, nome: 'Mouse', preco: 299},
  ]

  dataSource = new MatTableDataSource<any>(this.teste);

  constructor() {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

}

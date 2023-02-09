import { MatPaginator } from '@angular/material/paginator';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css']
})
export class OrdersListComponent implements OnInit {

  dataSource: any = [{ id: 1, email: 'viniolicar2004@gmail.com', value: 300, status: 'pago', data: '08/02/2023' }]
  columns: any = ['id', 'email', 'value', 'status', 'data', 'actions']
  order: any = false
  @ViewChild(MatPaginator) paginator: any;


  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  teste(event:Event) {
    console.log('teste')
  }

}

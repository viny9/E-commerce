import { Component, OnInit } from '@angular/core';
import { StipeService } from 'src/app/services/stipe.service';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.css']
})
export class AllOrdersComponent implements OnInit {

  payments: any

  constructor(private db: StipeService) { }

  ngOnInit(): void {
    this.getUserPayments()
  }

  getUserPayments() {
    this.db.getPayments().subscribe((res: any) => {

      const payments = res.docs.map((doc: any) => {
        return doc.data()
      })

      payments.map((element: any) => {
        const date = new Date(element.created * 1000)
        element.data = date
      });

      this.payments = payments.sort((a: any, b: any) => {
        const d: any = new Date(a.created);
        const c: any = new Date(b.created);
        return c - d;
      })
    })
  }

}

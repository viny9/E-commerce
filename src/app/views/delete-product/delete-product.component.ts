import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.css']
})
export class DeleteProductComponent implements OnInit {

  constructor(private ref:MatDialogRef<DeleteProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit(): void {
  }

  close() {
    this.ref.close()
  }

  delete() {
    this.ref.close(true)
  }
}

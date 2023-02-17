import { ProductService } from './../../services/product.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  hide:any = true
  signinForm:any

  constructor(private db:ProductService) { }

  ngOnInit(): void {
    this.createForm()
  }

  createForm() {
    this.signinForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    })
  }

  login() {
    this.db.singIn(this.signinForm.value)
  }

}

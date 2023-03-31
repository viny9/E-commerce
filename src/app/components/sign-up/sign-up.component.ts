import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  hidePassword: any = true
  hideConfirmPassword: any = true
  signupForm: any
  mask:any

  constructor(private db: ProductService) { }

  ngOnInit(): void {
    this.createForm()
    this.mask = this.db.inputMasks()
  }

  createForm() {
    this.signupForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required)
    })
  }

  newUser() {
    const user = this.signupForm.value
    user.admin = false

    if (user.password === user.confirmPassword) {
      delete user.confirmPassword
      this.db.signUp(user)

    } else {
      this.db.userMessages('As senhas são diferentes')
    }
  }

}

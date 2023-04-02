import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product/product.service';
import { UserService } from 'src/app/services/user/user.service';

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

  constructor(private userService: UserService, private productService:ProductService) { }

  ngOnInit(): void {
    this.createForm()
    this.mask = this.productService.inputMasks()
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
      this.userService.signUp(user)

    } else {
      this.userService.userMessages('As senhas são diferentes')
    }
  }

}

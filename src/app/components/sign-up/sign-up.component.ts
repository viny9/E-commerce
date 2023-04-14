import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product/product.service';
import { StripeService } from 'src/app/services/stripe/stripe.service';
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
  addressForm: any
  mask: any

  constructor(private userService: UserService, private productService: ProductService, private stripeService: StripeService) { }

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

    this.addressForm = new FormGroup({
      cep: new FormControl('', Validators.required),
      number: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      neighborhood: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      extra: new FormControl('')
    })

  }

  formChangeAnimationControl(form: any) {
    const userForm = document.querySelector('.userForm')
    const addressForm = document.querySelector('.addressForm')

    switch (form) {
      case 'address':
        userForm?.classList.add('hideUserForm')

        setTimeout(() => {
          userForm?.classList.add('none')

          addressForm?.classList.remove('none')
          addressForm?.classList.remove('hideAdressForm')
          addressForm?.classList.add('showAddressForm')
        }, 650);
        break;

      case 'user':
        addressForm?.classList.add('hideAdressForm')

        setTimeout(() => {
          addressForm?.classList.add('none')

          userForm?.classList.remove('none')
          userForm?.classList.remove('hideUserForm')
          userForm?.classList.add('showUserForm')
        }, 650);
        break;
    }
  }

  newUser() {
    const user = this.signupForm.value
    user.address = this.addressForm.value

    user.address.cep = user.address.cep.replace(/\D/g, ''); //Removendo a mask do valor
    user.phone = user.phone.replace(/\D/g, ''); //Removendo a mask do valor

    if (user.password === user.confirmPassword) {
      delete user.confirmPassword

      this.stripeService.createCustomer(user).subscribe((res: any) => {
        user.admin = false
        user.stripe_id = res.id

        this.userService.signUp(user)
      })

    } else {
      this.userService.userMessages('As senhas são diferentes')
    }
  }
}

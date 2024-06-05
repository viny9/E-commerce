import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from 'src/app/services/product/product.service';
import { StripeService } from 'src/app/services/stripe/stripe.service';
import { UserService } from 'src/app/services/user/user.service';
import { userMessages } from 'src/app/utils/snackbar';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;
  signupForm!: FormGroup;
  addressForm!: FormGroup;
  mask: any;

  constructor(
    private userService: UserService,
    private authService: AuthService,

    private snackBar: MatSnackBar,
    private stripeService: StripeService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.signupForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
    });

    this.addressForm = new FormGroup({
      cep: new FormControl('', Validators.required),
      number: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      neighborhood: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      extra: new FormControl(''),
    });
  }

  formChangeAnimationControl(form: any) {
    const userForm = document.querySelector('.userForm');
    const addressForm = document.querySelector('.addressForm');

    switch (form) {
      case 'address':
        userForm?.classList.add('hideUserForm');

        setTimeout(() => {
          userForm?.classList.add('none');

          addressForm?.classList.remove('none');
          addressForm?.classList.remove('hideAdressForm');
          addressForm?.classList.add('showAddressForm');
        }, 650);
        break;

      case 'user':
        addressForm?.classList.add('hideAdressForm');

        setTimeout(() => {
          addressForm?.classList.add('none');

          userForm?.classList.remove('none');
          userForm?.classList.remove('hideUserForm');
          userForm?.classList.add('showUserForm');
        }, 650);
        break;
    }
  }

  createUser() {
    const user = this.signupForm.value;
    user.address = this.addressForm.value;

    user.address.cep = user.address.cep.replace(/\D/g, ''); //Removendo a mask do valor
    user.phone = user.phone.replace(/\D/g, ''); //Removendo a mask do valor

    if (user.password === user.confirmPassword) {
      delete user.confirmPassword;
    } else {
      userMessages('As senhas são diferentes', this.snackBar);
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminRoutes } from 'src/app/enums/admin-routes';
import { ProductService } from 'src/app/services/product/product.service';
import { UserService } from 'src/app/services/user/user.service';
import { userMessages } from 'src/app/utils/snackbar';

@Component({
  selector: 'app-create-admin-user',
  templateUrl: './create-admin-user.component.html',
  styleUrls: ['./create-admin-user.component.css'],
})
export class CreateAdminUserComponent implements OnInit {
  form!: UntypedFormGroup;

  constructor(
    private db: ProductService,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {
    db.selectComponent = AdminRoutes.adminUsers;
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = new UntypedFormGroup({
      name: new UntypedFormControl('', Validators.required),
      email: new UntypedFormControl('', [Validators.required, Validators.email]),
      password: new UntypedFormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      confirmPassword: new UntypedFormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  createUser() {
    const user = this.form.value;

    if (user.password === user.confirmPassword) {
      delete this.form.value.confirmPassword;

      this.userService.newAdminUser(this.form.value);
    } else {
      userMessages('As senhas não estão iguais', this.snackBar);
    }
  }
}

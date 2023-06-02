import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminRoutes } from 'src/app/enums/admin-routes';
import { ProductService } from 'src/app/services/product/product.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-create-admin-user',
  templateUrl: './create-admin-user.component.html',
  styleUrls: ['./create-admin-user.component.css']
})
export class CreateAdminUserComponent implements OnInit {

  form!: FormGroup

  constructor(private db: ProductService, private userService: UserService) {
    db.selectComponent = AdminRoutes.adminUsers
  }

  ngOnInit(): void {
    this.createForm()
  }

  createForm() {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }

  createUser() {
    const user = this.form.value

    if (user.password === user.confirmPassword) {
      delete this.form.value.confirmPassword

      this.userService.newAdminUser(this.form.value)
    } else {
      this.db.userMessages('As senhas não estão iguais')
    }
  }

}

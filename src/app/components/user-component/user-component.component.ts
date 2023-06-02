import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/models/user';
import { LoadService } from 'src/app/services/load/load.service';
import { ProductService } from 'src/app/services/product/product.service';
import { UserService } from 'src/app/services/user/user.service';
import { DeleteAccountComponent } from 'src/app/views/delete-account/delete-account.component';

@Component({
  selector: 'app-user-component',
  templateUrl: './user-component.component.html',
  styleUrls: ['./user-component.component.css']
})
export class UserComponentComponent implements OnInit {

  user!: User
  userForm!: FormGroup
  addressForm!: FormGroup
  mask: any
  loading: boolean = false

  constructor(private userService: UserService, private db: ProductService, private auth: AngularFireAuth, private loadService: LoadService, private dialog: MatDialog) {
    loadService.isLoading.subscribe((res) => {
      this.loading = res
    })
  }

  ngOnInit(): void {
    this.userInfos()
    this.createForms()
    this.mask = this.db.inputMasks()
  }

  userInfos() {
    this.loadService.showLoading()

    this.userService.getUsers().subscribe((res) => {

      const users = res

      this.auth.user.subscribe((res: any) => {
        const filter = users.filter((user: any) => {
          return user.email === res.email
        })

        this.user = filter[0]
        this.createForms(this.user)
      })

      this.loadService.hideLoading()
    })
  }

  createForms(userInfos?: any) {
    this.userForm = new FormGroup({
      name: new FormControl(userInfos?.name),
      email: new FormControl(userInfos?.email),
      phone: new FormControl(userInfos?.phone),
    })

    this.addressForm = new FormGroup({
      cep: new FormControl(userInfos?.address.cep),
      number: new FormControl(userInfos?.address.number),
      neighborhood: new FormControl(userInfos?.address.neighborhood),
      city: new FormControl(userInfos?.address.city),
      state: new FormControl(userInfos?.address.state),
      extra: new FormControl(userInfos?.address.extra),
    })
  }

  signOut() {
    this.userService.logOut()
  }

  updateUserInfos() {
    this.userService.getUserById().subscribe(async (res: any) => {
      const email = res.data().email

      const user = {
        ...this.user,
        ...this.userForm.value,
        oldEmail: email
      }

      const address = this.addressForm.value
      user.address = address

      user.address.cep = user.address.cep.replace(/\D/g, ''); //Removendo a mask do valor
      user.phone = user.phone.replace(/\D/g, ''); //Removendo a mask do valor

      await this.userService.updateUser(user)
      this.userInfos()
    })
  }

  openDialog() {
    this.userService.getUserById().subscribe((res) => {
      const user = res.data()

      this.dialog.open(DeleteAccountComponent, {
        data: user,
        width: '500px',
        scrollStrategy: new NoopScrollStrategy()
      })
    })
  }

}

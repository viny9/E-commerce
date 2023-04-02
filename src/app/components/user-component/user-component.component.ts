import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl, FormGroup } from '@angular/forms';
import { LoadService } from 'src/app/services/load/load.service';
import { ProductService } from 'src/app/services/product/product.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user-component',
  templateUrl: './user-component.component.html',
  styleUrls: ['./user-component.component.css']
})
export class UserComponentComponent implements OnInit {

  user: any
  userForm: any
  addressForm: any
  mask: any
  loading: any = false

  constructor(private userService: UserService, private db: ProductService, private auth: AngularFireAuth, private loadService: LoadService) {
    loadService.isLoading.subscribe((res: any) => {
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

    this.userService.getUsers().subscribe((res: any) => {

      const users = res.docs.map((user: any) => {
        return user.data()
      })

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
      telephone: new FormControl(userInfos?.telephone),
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

  updateInfos() {
    const user = this.userForm.value
    const userId = localStorage['userId']
    const address = this.addressForm.value

    user.address = address

    this.userService.updateUser(userId, user)
      .then(() => this.db.userMessages('Informações atualizadas'))
  }

  teste() {
    console.log(this.userForm)
  }

}

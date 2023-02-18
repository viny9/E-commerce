import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl, FormGroup } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-user-component',
  templateUrl: './user-component.component.html',
  styleUrls: ['./user-component.component.css']
})
export class UserComponentComponent implements OnInit {

  constructor(private db: ProductService, private auth: AngularFireAuth) { }

  user: any
  userForm: any

  ngOnInit(): void {
    this.userInfos()
    this.createForm()
  }

  createForm(userInfos?: any) {
    this.userForm = new FormGroup({
      name: new FormControl(userInfos?.name),
      email: new FormControl(userInfos?.email),
      telephone: new FormControl(userInfos?.telephone),
    })
  }

  userInfos() {
    this.db.getUser().subscribe((res: any) => {

      const users = res.docs.map((user: any) => {
        return user.data()
      })

      this.auth.user.subscribe((res: any) => {
        const filter = users.filter((user: any) => {
          return user.email === res.email
        })

        this.user = filter[0]
        this.createForm(this.user)
      })
    })
  }

  signOut() {
    this.db.logOut()
  }

}

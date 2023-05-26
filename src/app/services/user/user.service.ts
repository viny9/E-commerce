import { User } from './../../models/user';
import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getAuth, updateEmail } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DialogUpdateUserComponent } from 'src/app/views/dialog-update-user/dialog-update-user.component';
import { environment } from 'src/environments/environment';
import { StripeService } from '../stripe/stripe.service';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userId = localStorage['userId']
  baseUrl: string = environment.backendBaseUrl

  constructor(private firestore: AngularFirestore, private auth: AngularFireAuth, private snackBar: MatSnackBar, private router: Router, private http: HttpClient, private dialog: MatDialog, private stripeService: StripeService) { }

  // Login e cadastro
  async signUp(user: any) {
    await this.auth.createUserWithEmailAndPassword(user.email, user.password)
      .catch((e) => this.userMessages(e))

    try {
      delete user.password
      await this.createUser(user)

      const token: any = await getAuth().currentUser?.getIdToken()
      localStorage.setItem('token', token)

      const infos: any = await this.userInfos(user)
      localStorage.setItem('userId', infos.userId)
      localStorage.setItem('admin', infos.admin)

      Promise.all([this.userMessages('Usuário criado'), this.navegate('')])

    } catch (error: any) {
      this.userMessages(error)
    }
  }

  async signIn(user: any) {
    await this.auth.signInWithEmailAndPassword(user.email, user.password)
      .catch((e) => this.userMessages(e))

    try {
      const token: any = await getAuth().currentUser?.getIdToken()
      localStorage.setItem('token', token)

      const infos: any = await this.userInfos(user)
      localStorage.setItem('userId', infos.userId)
      localStorage.setItem('admin', infos.admin)

      this.navegate('')
    } catch (error: any) {
      this.userMessages(error)
    }
  }

  async userInfos(user: User) {
    const res = await lastValueFrom(this.getUsers())
    const ids = res.docs

    const emails = res.docs.map((res: any) => {
      return res.data().email
    })

    const users = res.docs.map((users: any) => {
      return users.data()
    })

    const index = emails.indexOf(user.email)
    const filter = users[index]

    const userInfos = {
      userId: ids[index].id,
      admin: filter.admin
    }

    return userInfos
  }

  logOut() {
    this.auth.signOut()
      .then(() => localStorage.clear())
      .then(() => this.navegate('signIn'))
      .then(() => window.location.reload())
  }

  // Informações do usuário
  getUsers() {
    return this.firestore.collection('users').get()
  }

  getUser() {
    return this.firestore.collection('users').doc(this.userId).get()
  }

  createUser(userInfos: User) {
    return this.firestore.collection('users').add(userInfos)
  }

  async updateUser(updatedInfos: User) {
    const auth: any = getAuth().currentUser

    if (updatedInfos.email != updatedInfos.oldEmail) {
      try {
        await updateEmail(auth, updatedInfos.email) // Atualiza o authenticator
          .catch(() => {  // Abri um dialog para fazer login caso necessário
            this.dialog.open(DialogUpdateUserComponent, {
              data: updatedInfos,
              width: '500px',
              scrollStrategy: new NoopScrollStrategy()
            })
          })
        delete updatedInfos.oldEmail

        await this.firestore.collection('users').doc(this.userId).update(updatedInfos) // Atualiza o firestore
        this.stripeService.updateCustomer(updatedInfos).subscribe() //Atualiza o stripe

        this.userMessages('Informações atualizadas')
      } catch (error: any) {
        this.userMessages(error)
      }
      // return updateEmail(auth, updatedInfos.email)
      // .then(() => delete updatedInfos.oldEmail)
      // .then(() => this.firestore.collection('users').doc(this.userId).update(updatedInfos))
      // .then(() => {
      //   this.stripeService.updateCustomer(updatedInfos).subscribe((res: any) => {
      //     console.log(res)
      //   })
      // })
      // .then(() => this.userMessages('Informações atualizadas'))
      // .catch((e) => {
      //   this.dialog.open(DialogUpdateUserComponent, {
      //     data: updatedInfos,
      //     width: '500px',
      //     scrollStrategy: new NoopScrollStrategy()
      //   })
      // })
    } else {
      try {
        delete updatedInfos.oldEmail

        await this.firestore.collection('users').doc(this.userId).update(updatedInfos) // Atualiza o firestore
        this.stripeService.updateCustomer(updatedInfos).subscribe() //Atualiza o stripe
      } catch (error: any) {
        this.userMessages(error)
      }
    }
  }

  async updateUserWithLogin(user: any) {
    const auth: any = getAuth()

    this.auth.signInWithEmailAndPassword(user.oldEmail, user.password)
      .catch((e) => this.userMessages(e))

    try {
      await updateEmail(auth, user.email)
      delete user.oldEmail && delete user.password

      await this.firestore.collection('users').doc(this.userId).update(user)
      this.stripeService.updateCustomer(user).subscribe()
      this.userMessages('Dados atualizados')

    } catch (error: any) {
      this.userMessages(error)
    }
  }

  async deleteUser(user: any) {
    await this.auth.signInWithEmailAndPassword(user.email, user.password)
    await getAuth().currentUser?.delete() // Exclui o usuário no authentic 
    await this.firestore.collection('users').doc(this.userId).delete() // Exclui o usuário da firestore
    this.stripeService.deleteCustomer(user.stripe_id).subscribe() //Exclui o  usuário no stripe
  }

  // User status
  isLogged() {
    const token = localStorage['token']

    if (token) {
      return true
    } else {
      return false
    }
  }

  // Emails 
  sendVerificationCodeEmail(email: string) {
    const body = {
      email: email
    }

    return this.http.post(`${this.baseUrl}/recoverPassword`, body)
  }

  async sendPasswordResetEmail(email: string) {
    await this.auth.sendPasswordResetEmail(email)
    Promise.all([this.userMessages('Foi enviado um email para atualizar senha'), this.navegate('/signIn')])
  }

  // Extras
  userMessages(message: string) {
    this.snackBar.open(message, 'X', {
      duration: 2000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: 'snackBar'
    })
  }

  navegate(path: string) {
    return this.router.navigate([path])
  }
}

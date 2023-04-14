// Talvez criar um dialog para fazer o login, basicamente passar a senha 
// Fazer um if para atualizar o email do authentic
// revizar o código 
// E enviar para o github

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

@Injectable({
  providedIn: 'root'
})
export class UserService {

  admin: any
  userId: any = localStorage['userId']
  baseUrl = environment.backendBaseUrl

  constructor(private firestore: AngularFirestore, private auth: AngularFireAuth, private snackBar: MatSnackBar, private router: Router, private http: HttpClient, private dialog: MatDialog, private stripeService: StripeService) { }


  // Login e cadastro
  signUp(user: any) {
    return this.auth.createUserWithEmailAndPassword(user.email, user.password)
      .then(() => {
        delete user.password
        this.createUser(user)
      })

      .then(() => {
        getAuth().currentUser?.getIdToken()
          .then((token: any) => localStorage.setItem('token', token))
      })
      .then(() => this.setAdmin(user))
      .then(() => this.setUserId(user))

      .then(() => this.userMessages('Usuário criado'))
      .then(() => this.navegate(''))
  }

  signIn(user: any) {
    this.auth.signInWithEmailAndPassword(user.email, user.password)
      .then(() => {
        getAuth().currentUser?.getIdToken()
          .then((token: any) => localStorage.setItem('token', token))
          .then(() => this.setAdmin(user))
          .then(() => this.setUserId(user))
      })
      .then(() => {
        setTimeout(() => {
          const admin = this.userStatus().admin

          if (admin === true) {
            this.navegate('admin/products')
          } else if (admin === false) {
            this.navegate('')
          }
        }, 700);
      })
      .catch((e: any) => {
        this.userMessages(e)
      })
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

  createUser(userInfos: any) {
    this.firestore.collection('users').add(userInfos)
  }

  updateUser(updatedInfos: any) {
    const auth: any = getAuth().currentUser

    if (updatedInfos.email != updatedInfos.oldEmail) {
      return updateEmail(auth, updatedInfos.email)
        .then(() => delete updatedInfos.oldEmail)
        .then(() => this.firestore.collection('users').doc(this.userId).update(updatedInfos))
        .then(() => {
          this.stripeService.updateCustomer(updatedInfos).subscribe((res: any) => {
            console.log(res)
          })
        })
        .then(() => this.userMessages('Informações atualizadas'))
        .catch((e) => {
          this.dialog.open(DialogUpdateUserComponent, {
            data: updatedInfos,
            width: '500px',
            scrollStrategy: new NoopScrollStrategy()
          })
        })
    } else {
      delete updatedInfos.oldEmail
      return this.firestore.collection('users').doc(this.userId).update(updatedInfos)
    }
  }

  updateUserWithLogin(user: any) {
    const auth: any = getAuth()

    return this.auth.signInWithEmailAndPassword(user.oldEmail, user.password)
      .then(() => updateEmail(auth, user.email))
      .then(() => delete user.oldEmail && delete user.password)
      .then(() => this.firestore.collection('users').doc(this.userId).update(user))
      .then(() => this.stripeService.updateCustomer(user).subscribe())
      .then(() => this.userMessages('Dados atualizados'))
      .catch((e) => this.userMessages(e))
  }

  deleteUser(user: any) {
    return this.auth.signInWithEmailAndPassword(user.email, user.password)
      .then(() => {
        getAuth().currentUser?.delete() // Exclui o usuário no authentic 
      })
      .then(() => {
        this.firestore.collection('users').doc(this.userId).delete() // Exclui o usuário da firestore
      })
  }

  setUserId(user: any) {
    this.getUsers().subscribe((res: any) => {
      const ids = res.docs

      const users = res.docs.map((res: any) => {
        return res.data().email
      })

      const index = users.indexOf(user.email)
      localStorage.setItem('userId', ids[index].id)
    })
  }

  // User status
  isAdmin() {
    const admin = eval(localStorage['admin'])

    if (admin === true) {
      return true
    } else {
      return false
    }
  }

  isLogged() {
    const token = localStorage['token']

    if (token) {
      return true
    } else {
      return false
    }
  }

  setAdmin(userInfos?: any) {
    this.getUsers().subscribe((res: any) => {
      const users = res.docs.map((users: any) => {
        return users.data()
      })

      const filter = users.filter((user: any) => {
        return user.email === userInfos.email
      })

      localStorage.setItem('admin', filter[0]?.admin)
    })
  }

  userStatus() {
    const status = {
      logged: this.isLogged(),
      admin: this.isAdmin(),
    }

    return status
  }

  // Emails 

  sendVerificationCodeEmail(email: any) {
    const body = {
      email: email
    }

    return this.http.post(`${this.baseUrl}/recoverPassword`, body)
  }

  sendPasswordResetEmail(email: any) {
    this.auth.sendPasswordResetEmail(email)
      .then(() => this.userMessages('Foi enviado um email para atualizar senha'))
      .then(() => this.navegate('/signIn'))
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

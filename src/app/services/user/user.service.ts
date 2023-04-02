import { Injectable } from '@angular/core';
import { getAuth } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  admin: any
  userId: any = localStorage['userId']

  constructor(private firestore: AngularFirestore, private auth: AngularFireAuth, private snackBar: MatSnackBar, private router: Router) { }


  // Login e cadastro
  signUp(user: any) {
    this.auth.createUserWithEmailAndPassword(user.email, user.password)
      .then(() => {
        delete user.password
        this.createUser(user)
      })

      .then(() => {
        getAuth().currentUser?.getIdToken()
          .then((token: any) => localStorage.setItem('token', token))
      })

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
        }, 500);
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

  updateUser(userId: any, updatedInfos: any) {
    return this.firestore.collection('users').doc(userId).update(updatedInfos)
  }

  deleteUser() {
    this.auth.onAuthStateChanged((user?: any) => {
      return getAuth().currentUser?.delete()
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

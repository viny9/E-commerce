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
import { catchError, lastValueFrom, map } from 'rxjs';
import { ErrorsService } from '../errors/errors.service';
import { ProductService } from '../product/product.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userId = localStorage['userId']
  baseUrl: string = environment.backendBaseUrl

  constructor(private firestore: AngularFirestore, private auth: AngularFireAuth, private snackBar: MatSnackBar, private router: Router, private http: HttpClient, private dialog: MatDialog, private productService: ProductService, private stripeService: StripeService, private errorService: ErrorsService) { }

  // Login e cadastro
  async signUp(user: any) {
    try {
      await this.auth.createUserWithEmailAndPassword(user.email, user.password)

      delete user.password
      await this.createUser(user)

      const token: any = await getAuth().currentUser?.getIdToken()
      localStorage.setItem('token', token)

      const infos: any = await this.userInfos(user)
      localStorage.setItem('userId', infos.userId)
      localStorage.setItem('admin', infos.admin)

      await Promise.all([this.userMessages('Usuário criado'), this.navegate('')])

    } catch (error) {
      this.errorService.handleError(error)
    }
  }

  async signIn(user: any) {
    try {
      await this.auth.signInWithEmailAndPassword(user.email, user.password)

      const token: any = await getAuth().currentUser?.getIdToken()
      localStorage.setItem('token', token)

      const infos: any = await this.userInfos(user)
      localStorage.setItem('userId', infos.userId)
      localStorage.setItem('admin', infos.admin)

      this.navegate('')
    } catch (error) {
      this.errorService.handleError(error)
    }
  }

  async userInfos(item: User) {
    const query = this.firestore.collection('users', ref => ref.where('email', '==', item.email));
    const doc = await lastValueFrom<any>(query.get().pipe(
      map(res => {
        const doc = res.docs[0];
        return doc ? doc : null;
      })
    ))

    const user = doc.data()

    const userInfos = {
      userId: doc.id,
      admin: user.admin
    }

    return userInfos
  }

  logOut() {
    this.auth.signOut()

    localStorage.clear()
    window.location.reload()
  }

  // Informações do usuário
  getUsers() {
    return this.firestore.collection('users').get()
      .pipe(
        map((res) => {
          return res.docs.map((doc) => doc.data())
        }),
        catchError((e: Error) => this.errorService.handleError(e))
      )
  }

  getUserById() {
    return this.firestore.collection('users').doc(this.userId).get()
      .pipe(
        catchError((e: Error) => this.errorService.handleError(e))
      )
  }

  createUser(userInfos: User) {
    return this.firestore.collection('users').add(userInfos)
      .catch((e: Error) => this.errorService.handleError(e))
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

        this.userMessages('Usuário atualizado')

      } catch (error) {
        this.errorService.handleError(error)
      }

    } else {
      try {
        delete updatedInfos.oldEmail

        await this.firestore.collection('users').doc(this.userId).update(updatedInfos) // Atualiza o firestore
        this.stripeService.updateCustomer(updatedInfos).subscribe() //Atualiza o stripe
        this.userMessages('Usuário atualizado')

      } catch (error) {
        this.errorService.handleError(error)
      }
    }
  }

  async updateUserWithLogin(user: any) {
    const auth: any = getAuth()

    try {
      this.auth.signInWithEmailAndPassword(user.oldEmail, user.password)

      await updateEmail(auth, user.email) // Atualiza o authenticator
      delete user.oldEmail && delete user.password

      await this.firestore.collection('users').doc(this.userId).update(user)  // Atualiza o firestore
      this.stripeService.updateCustomer(user).subscribe()  //Atualiza o stripe
      this.userMessages('Dados atualizados')

    } catch (error) {
      this.errorService.handleError(error)
    }
  }

  async deleteUser(user: any) {
    try {
      await this.auth.signInWithEmailAndPassword(user.email, user.password)
      await getAuth().currentUser?.delete() // Exclui o usuário no authentic 
      await this.firestore.collection('users').doc(this.userId).delete() // Exclui o usuário da firestore
      this.stripeService.deleteCustomer(user.stripe_id).subscribe() //Exclui o  usuário no stripe
    } catch (error) {
      this.errorService.handleError(error)
    }
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
      .pipe(
        catchError((e: Error) => this.errorService.handleError(e))
      )
  }

  async sendPasswordResetEmail(email: string) {
    try {
      await this.auth.sendPasswordResetEmail(email)
      await Promise.all([this.userMessages('Foi enviado um email para atualizar senha'), this.navegate('/signIn')])
    } catch (error) {
      this.errorService.handleError(error)
    }
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

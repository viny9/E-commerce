import { User } from './../../models/user';
import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

  constructor(private snackBar: MatSnackBar, private router: Router, private http: HttpClient, private dialog: MatDialog, private productService: ProductService, private stripeService: StripeService, private errorService: ErrorsService) { }

  // Login e cadastro


  async newAdminUser(user: any) {
    try {
      await this.auth.createUserWithEmailAndPassword(user.email, user.password)
      delete user.password
      user.admin = true

      await this.createUser(user)
      await Promise.all([this.userMessages('Usuário criado'), this.navegate('admin/adminUsersList')])

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

  getAdminUsers() {
    const query = this.firestore.collection('users', ref => ref.where('admin', '==', true))
    return query.get().pipe(
      catchError((e: Error) => this.errorService.handleError(e))
    )

  }

  getUserById(id: any) {
    return this.firestore.collection('users').doc(id).get()
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

  async updateUserAsAdmin(user: any) {
    const query = this.firestore.collection('users', ref => ref.where('email', '==', user.oldEmail));
    const id = await lastValueFrom<any>(query.get().pipe(
      map(res => {
        const doc = res.docs[0];
        return doc ? doc.id : null;
      })
    ))

    const newUser = {
      ...user
    }

    delete newUser.password && user.password
    delete newUser.confirmPassword && user.confirmPassword
    delete newUser.oldEmail

    await this.firestore.collection('users').doc(id).update(newUser)
    return this.http.put(`${this.baseUrl}/updateUser`, user)
      .pipe(
        catchError((e: Error) => this.errorService.handleError(e))
      )
  }

  async deleteUserAsAdmin(user: any) {
    const id = await this.productService.getId('users', user)

    await this.firestore.collection('users').doc(id).delete()
    return this.http.post(`${this.baseUrl}/deleteUser`, user)
      .pipe(
        catchError((e: Error) => this.errorService.handleError(e))
      )
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

  // // Extras
  // userMessages(message: string) {
  //   this.snackBar.open(message, 'X', {
  //     duration: 2000,
  //     horizontalPosition: 'end',
  //     verticalPosition: 'top',
  //     panelClass: 'snackBar'
  //   })
  // }

  navegate(path: string) {
    return this.router.navigate([path])
  }
}

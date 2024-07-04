import { User } from '../../../shared/models/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';
import { catchError, filter } from 'rxjs';
import { ErrorsService } from '../../../services/errors/errors.service';
import { userMessages } from 'src/app/shared/utils/snackbar';
import { Router } from '@angular/router';
import { SignUp } from 'src/app/shared/models/signup';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userId: string = localStorage['userId'];
  private baseUrl: string = environment.backendBaseUrl;

  constructor(
    private snackbar: MatSnackBar,
    private http: HttpClient,
    private errorService: ErrorsService,
    private router: Router
  ) {}

  async newAdminUser(user: User) {
    return this.http
      .post(`${this.baseUrl}/user`, user)
      .pipe(catchError((e: Error) => this.errorService.handleError(e)))
      .subscribe(() => {
        userMessages('Usuário criado', this.snackbar);
        this.router.navigate(['admin/adminUsersList']);
      });
  }

  getUsers() {
    return this.http
      .get(`${this.baseUrl}/user`)
      .pipe(catchError((e: Error) => this.errorService.handleError(e)));
  }

  getAdminUsers() {
    return this.http
      .get<User>(`${this.baseUrl}/user`)
      .pipe(filter((user) => user.isAdmin))
      .pipe(catchError((e: Error) => this.errorService.handleError(e)));
  }

  getUserById(id: string) {
    return this.http
      .get<User>(`${this.baseUrl}/user/${id}`)
      .pipe(catchError((e: Error) => this.errorService.handleError(e)));
  }

  createUser(userInfos: SignUp) {
    return this.http
      .post(`${this.baseUrl}/user`, userInfos)
      .pipe(catchError((e: Error) => this.errorService.handleError(e)));
  }

  async updateUser(id: string, updatedInfos: User) {
    return this.http
      .put(`${this.baseUrl}/user/${id}`, updatedInfos)
      .pipe(catchError((e: Error) => this.errorService.handleError(e)))
      .subscribe(() => userMessages('Usuário atualizado', this.snackbar));
  }

  async deleteUser(user: User) {
    return this.http
      .delete(`${this.baseUrl}/user/${user.id}`)
      .pipe(catchError((e: Error) => this.errorService.handleError(e)));
  }

  // // Emails
  // sendVerificationCodeEmail(email: string) {
  //   const body = {
  //     email: email,
  //   };

  //   return this.http
  //     .post(`${this.baseUrl}/recoverPassword`, body)
  //     .pipe(catchError((e: Error) => this.errorService.handleError(e)));
  // }

  // async sendPasswordResetEmail(email: string) {
  //   try {
  //     await this.auth.sendPasswordResetEmail(email);
  //     await Promise.all([
  //       this.userMessages('Foi enviado um email para atualizar senha'),
  //       this.navegate('/signIn'),
  //     ]);
  //   } catch (error) {
  //     this.errorService.handleError(error);
  //   }
  // }
}

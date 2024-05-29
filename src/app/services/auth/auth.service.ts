import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignUp } from 'src/app/models/signup';
import { ErrorsService } from '../errors/errors.service';
import { environment } from 'src/environments/environment.prod';
import { User } from 'src/app/models/user';
import { catchError } from 'rxjs';
import { userMessages } from 'src/app/utils/snackbar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Login } from 'src/app/models/login';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private errorService: ErrorsService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  private baseUrl: string = environment.backendBaseUrl;

  async signUp(user: SignUp) {
    this.http
      .post<User>(`${this.baseUrl}/auth/signup`, user)
      .pipe(catchError((e) => this.errorService.handleError(e)))
      .subscribe(() => {
        userMessages('Usuário criado', this.snackBar);
        this.router.navigate(['/login']);
      });
  }

  async login(user: Login) {
    this.http
      .post(`${this.baseUrl}/auth/login`, user)
      .pipe(catchError((e) => this.errorService.handleError(e)))
      .subscribe(({ access_token }) => {
        localStorage.setItem('token', access_token);
        
        // Decodar o token aqui
        // localStorage.setItem('userId', infos.userId);
        // localStorage.setItem('admin', infos.admin);

        this.router.navigate(['']);
      });
  }

  logOut() {
    localStorage.clear();
    sessionStorage.clear();
    window.location.reload();
  }

  isLogged() {
    const token = localStorage['token'];

    if (token) {
      return true;
    } else {
      return false;
    }
  }
}

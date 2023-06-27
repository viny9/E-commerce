import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorsService {

  constructor(private snackBar: MatSnackBar) { }

  handleError(error: any): Observable<any> {
    const userMessage = this.errorMesagens(error.code || error.status)
    this.snackBar.open(userMessage, 'X', {
      duration: 2000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: 'snackBar'
    })

    return EMPTY
  }

  errorMesagens(error: string | number): string {
    switch (error) {
      case 'auth/user-not-found':
      case 'auth/wrong-password':
        return 'E-mail ou senha incorretos '
        break;

      case 'auth/invalid-email':
        return 'Endereço de e-mail inválido'
        break

      case 'auth/too-many-requests':
        return ''
        break

      case 'auth/email-already-in-use':
        return 'Email já está em uso'
        break

      case 0:
      case 500:
        return 'Erro no servidor'
        break

      case 400:
        return ''
        break

      default:
        return 'Erro'
        break;
    }
  }
}

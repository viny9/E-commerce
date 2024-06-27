import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';

export const userMessages = (message: string, snackBar: MatSnackBar) => {
  snackBar.open(message, 'X', {
    duration: 2000,
    horizontalPosition: 'end',
    verticalPosition: 'top',
    panelClass: 'snackBar',
  });
};

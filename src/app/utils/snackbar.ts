import { MatSnackBar } from '@angular/material/snack-bar';

export const userMessages = (message: string, snackBar: MatSnackBar) => {
  snackBar.open(message, 'X', {
    duration: 2000,
    horizontalPosition: 'end',
    verticalPosition: 'top',
    panelClass: 'snackBar',
  });
};

import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {
msg!: string
  constructor(private snackBar:MatSnackBar ) { }
  openSnackBar(msg: string){
    this.snackBar.open(msg, "Close",{
      horizontalPosition: 'center',
      verticalPosition:'bottom',
      duration: 3000

    })

  }

}

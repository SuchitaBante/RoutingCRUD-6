import { Component, OnInit } from '@angular/core';
import { Iuser } from '../../models/Iuser';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { SnackBarService } from '../../services/snack-bar.service';
import { UserService } from '../../services/user.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GetConfirmComponent } from '../get-confirm/get-confirm.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
user!:Iuser
userId!:string
  constructor(private routes:ActivatedRoute, private router:Router, private snackBar:SnackBarService, private userservice:UserService, private matDialog:MatDialog) { }

  ngOnInit(): void {
    this.fetchUsers()
  }
  fetchUsers(){
    this.routes.paramMap.subscribe(params=>{
      this.userId= params.get('userId')!;
      console.log('Selected User:', this.userId);
      if(this.userId){
        this.userservice.fetchUsersById(this.userId).subscribe({
          next:data=>{
            this.user= data;
          },
          error: err=>{
            console.log(err)
          }
        })
      }
    })
  }
onEditUser(){
  this.router.navigate(['/userdashboard' , this.userId, 'edit'],{
    queryParamsHandling: 'preserve',
    relativeTo:this.routes
  })

}
onRemoveUser() {

  const config = new MatDialogConfig();

  config.width = '400px';
  config.disableClose = true;
  config.data = `Are you sure you want to remove the user with id ${this.userId}?`;

  const matRef = this.matDialog.open(GetConfirmComponent, config);

  matRef.afterClosed().subscribe((result: boolean) => {


    if (!result) {
      return;
    }

  
    this.userservice.removeUser(this.userId).subscribe({
      next: res => {

        this.snackBar.openSnackBar(res.msg);

        const users = this.userservice.userArr;

        if (users.length > 0) {
          this.router.navigate(['/userdashboard', users[0].userId]);
        } else {
          this.router.navigate(['/userdashboard']);
        }
      },
      error: err => {
        console.log(err);
      }
    });

  });

}
}
import { Component, OnInit } from '@angular/core';
import { Iuser } from '../../models/Iuser';
import { UserService } from '../../services/user.service';
import { SnackBarService } from '../../services/snack-bar.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-userdashboard',
  templateUrl: './userdashboard.component.html',
  styleUrls: ['./userdashboard.component.scss']
})
export class UserdashboardComponent implements OnInit {
Users!:Iuser[]
  constructor(private userservice: UserService, private snackBar:SnackBarService, private router:Router, private routes:ActivatedRoute ) { }

  ngOnInit(): void {
    this.getUsers()
  }
  getUsers(){
    this.userservice.fetchUsers().subscribe({
      next: data=>{
        this.Users=data
        if(this.Users.length >0 && !this.routes.firstChild){
          this.router.navigate(['/userdashboard', this.Users[0].userId])
        }
      },
      error: err =>{
      this.snackBar.openSnackBar(err)
      }
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { SnackBarService } from '../../services/snack-bar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  isAllreadyHaveAccount: boolean = true;
  signInform!: FormGroup;
  loginform!: FormGroup;
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private snackBar: SnackBarService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.createLoginForm();
    this.createSignUpForm();
  }

  createSignUpForm(): void {
    this.signInform = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ]),
      userRole: new FormControl('', [
        Validators.required
      ])
    });
  }

  createLoginForm(): void {
    this.loginform = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required
      ])
    });
  }

  onSignUp(): void {

    if (this.signInform.invalid) {
      this.signInform.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    this.authService.onSignIn(this.signInform.value).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        this.snackBar.openSnackBar(res.message);
        this.signInform.reset();
        this.isAllreadyHaveAccount = true;
      },
      error: (err) => {
        this.isLoading = false;
        this.snackBar.openSnackBar(
          err.error?.message || 'Registration Failed'
        );
      }
    });
  }

  onLogIn(): void {

    if (this.loginform.invalid) {
      this.loginform.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    const { email, password } = this.loginform.value;

    
    setTimeout(() => {

      if (email === 'may@gmail.com' && password === 'zaq1ZAQ!') {

        this.isLoading = false;
        this.snackBar.openSnackBar('Login Successful');
        this.router.navigate(['/home']);

      } else {

        this.isLoading = false;
        this.snackBar.openSnackBar('Invalid Email or Password');

      }

    }, 2000);

  }

}
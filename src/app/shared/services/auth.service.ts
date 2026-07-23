import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
BASE_URL= environment.authBaseUrl
  constructor(private _http:HttpClient) { }

  logIn(userDeatils: any){
    let LOGIN_URL = `${this.BASE_URL}/api/auth/login`;
    return this._http.post(LOGIN_URL, userDeatils);
  }
  saveToken(token: string){
    localStorage.setItem('token', token);
  }
  saveUserRole(userRole: string){
    localStorage.setItem('userRole', userRole);
  }
  onSignIn(userDeatils:string){
    let SIGN_IN_URL = `${this.BASE_URL}/api/auth/register`;
    return this._http.post(SIGN_IN_URL, userDeatils);
  }
  onLogOut():Observable<any>{
    localStorage.removeItem('userRole');
    localStorage.removeItem('token');
    return of({
      message:`Log out Successfully...!`,
    });
  }
  getToken():string | null{
    return localStorage.getItem('token')

  }

getUserRole(): string | null{
  return localStorage.getItem('userRole')
}
}
 
  
  
 
 
  
 
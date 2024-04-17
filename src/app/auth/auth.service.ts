import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';

import { User } from './user.model';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}
@Injectable({
  providedIn: 'root'
})

export class AuthService {

  user = new BehaviorSubject<User | null>(null);
    private tokenExpirationTimer: any;


  constructor(private http:HttpClient, private router:Router) { }

  signUp(email: string, password: string){ //ساين اب في الفاير بيز ليه لينك وتحط فيه ال [API_KEY] في الاخر
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCFXx2XqtaS4Va6Uw0HRrGeFbYB_Q6K67k',{
      email: email,
      password: password,
      returnSecureToken:true
    }).pipe(
      catchError(this.handleError),
        tap(resData => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })

      );
  }

  login(email: string, password: string){
      return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCFXx2XqtaS4Va6Uw0HRrGeFbYB_Q6K67k',{
      email: email,
      password: password,
      returnSecureToken:true
    }).pipe(catchError(this.handleError),
        tap(resData => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        }))
  }

  autoLogin(){ //عشان افضل عامل لوج ان بعد ما اعمل ريفريش
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData')!);
    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) { //لو فيه توكين موجود يعمله emit
      this.user.next(loadedUser);
      // const expirationDuration =
      //   new Date(userData._tokenExpirationDate).getTime() -
      //   new Date().getTime();
      // this.autoLogout(expirationDuration);
    }
  }

  logout(){
    this.user.next(null);
    localStorage.removeItem('userData');
    this.router.navigate(['/auth']);
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

    autoLogout(expirationDuration: number) { //يعمل لوج اوت لوحده بعد فترة معينة
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

    handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct.';
        break;
    }
    return throwError(errorMessage);
  }

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
  }



}

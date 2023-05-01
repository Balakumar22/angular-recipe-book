import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';

export interface AuthResponse {
  expiresIn: string;
  idToken: string;
  refreshToken: string;
  localId: string;
  email: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {}

  signUp(email: string, password: string) {
    return this.http
      .post<AuthResponse>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
          environment.fireBaseKey,
        {
          email,
          password,
          returnSecureToken: true,
        }
      )
      .pipe(catchError(this.handleError));
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponse>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
          environment.fireBaseKey,
        {
          email,
          password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthenticate(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  authLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      expiresIn: string;
    } = JSON.parse(localStorage.getItem('userData'));

    console.log(userData);

    if (!userData) {
      return;
    }

    const user = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData.expiresIn)
    );

    const expiresIn =
      new Date(userData.expiresIn).getTime() - new Date().getTime();
    console.log(expiresIn / 1000 / 60);

    if (user.token) {
      this.user.next(user);
      this.autoLogout(expiresIn);
    }
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['authenticate']);
    localStorage.removeItem('userData');
    clearTimeout(this.tokenExpirationTimer);
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleAuthenticate(
    email: string,
    id: string,
    token: string,
    expiresIn: number
  ) {
    const expire = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, id, token, expire);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!error.error || !error.error.error) {
      return throwError(errorMessage);
    }

    switch (error.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = "This email was doesn't exists";
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Invalid password!';
        break;
    }

    return throwError(errorMessage);
  }
}

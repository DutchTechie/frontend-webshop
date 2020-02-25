import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Subject, throwError, BehaviorSubject } from 'rxjs';
import { User } from './user.model'
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

interface AuthResponseData {
  userEmail: string,
  userPassword: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<User>(null) // TODO: why use this type?

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      "http://localhost:8080/user",
      {
        userEmail: email, 
        userPassword: password
      }
    ).pipe(catchError(this.handleError), tap(resData => {
        this.handleAuthentication(resData.userEmail, "1", false) // TODO: Replace with actual user id ans admin info
        this.router.navigate(['/'])
    }))
  }
  
  logout() {
    this.user.next(null)
    this.router.navigate(['/login'])
    localStorage.removeItem('userData')
  }

  handleOnAccountLinkClicked() {
    // TODO: Check if the user is authenticated
    // If the user is not authenticated, redirect to login screen
    this.router.navigate(['/account'])
  }

  deleteUserAccount() {
    // TODO: implement delete function
    this.router.navigate(['/'])
  }

  // TODO: Implement update user method
  updateUserAccount() {
    console.log("Update user")
  }

  private handleAuthentication(email: string, userId: string, isAdmin: boolean) {
    const user = new User(
      userId,
      email,
      isAdmin
    );
    this.user.next(user)  // TODO: What does this 'next' do?
    console.log(this.user)
    localStorage.setItem('userData', JSON.stringify(user))
  }

  // TODO: Add autologout
  autoLogin() {
    const userData: {
      userId: string,
      userEmail: string,
      isAdmin: boolean
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }

    const loadedUser = new User(userData.userId, userData.userEmail, userData.isAdmin)
    this.user.next(loadedUser)
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct';
        break;
    }
    return throwError(errorMessage);
  }
}
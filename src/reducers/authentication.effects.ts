import { Actions, ofType, Effect } from '@ngrx/effects'
import * as AuthActions from './authentication.actions'
import { switchMap, catchError, tap, map } from 'rxjs/operators';
import { User } from 'src/models/user.model';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

// Note that whatever data you recieve from the server has specific
// properties. Therefore, you can create an interface that matches
// that of the object you'll recieve
export interface AuthenticationResponseData {
  id: string;
  email: string;
  admin: boolean;
}

const handleAuthentication = (
  userId: string,
  email: string,
  isAdmin: boolean,
  redirect: boolean
) => {
  const user = new User(userId, email, isAdmin);
  localStorage.setItem('userData', JSON.stringify(user));
  return new AuthActions.AuthenticateSuccess({
    userId: userId,
    email: email,
    isAdmin: isAdmin,
    redirect: redirect
  });
};

const handleError = (errorResponse: any) => {
  let errorMessage = 'An unknown error occurred!';
  if (!errorResponse.error || !errorResponse.error.error) {
    // What of does, is, it emits values in a sequence, depending on
    // how many parameters you have. So, of(1, 2, 3)
    // Subscribing to this, means you'll get the output: 1, 2, 3. That's all!
    return of(new AuthActions.AuthenticateFail(errorMessage));
  }
  return of(new AuthActions.AuthenticateFail(errorMessage));
}

@Injectable()
export class AuthenticationEffects {

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router
  ) {}

  @Effect()
  authenticationSignup = this.actions$.pipe(  // pipe lets you combine multiple functions into a single function
    // ofType filters an Observable of Actions into an observable
    // this observable is of the type of the actions whose type strings are passed to it.
    ofType(AuthActions.SIGNUP_START),
    // use switchmap to switch to a new observable
    switchMap((signupAction: AuthActions.SignupStart) => {
      const userCredentials = `${signupAction.payload.email}/${signupAction.payload.password}`;
      return this.http
        .post<AuthenticationResponseData>(
          `http://localhost:8080/users/signup/${userCredentials}`,
          null
        )
        .pipe(
          // tap allows you to perform actions or side-effects
          tap(responseData => {
            console.log(responseData);
            // TODO: Set logout timer
          }),
          map(resData => {
            return handleAuthentication(
              resData.id,
              resData.email,
              resData.admin,
              false
            );
          }),
          catchError(errorResponse => {
            return handleError(errorResponse);
          })
        )
    })
  )

  @Effect()
  authenticationLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap((authenticationData: AuthActions.LoginStart) => {
      const userCredentials = `${authenticationData.payload.email}/${authenticationData.payload.password}`;
      return this.http
        .post<AuthenticationResponseData>(
          `http://localhost:8080/users/login/${userCredentials}`,
          null
        )
        .pipe(
          tap(responseData => {
            // TODO: Add a timer
            console.log(responseData);
          }),
          map(responseData => {
            console.log(responseData);
            return handleAuthentication(
              responseData.id,
              responseData.email,
              responseData.admin,
              true
            );
          }),
          catchError(errorResponse => {
            return handleError(errorResponse);
          })
        )
    })
  )


  @Effect({ dispatch: false })
  authenticationRedirect = this.actions$.pipe(
    ofType(AuthActions.AUTHENTICATE_SUCCESS),
    tap((authSuccessAction: AuthActions.AuthenticateSuccess) => {
      if (authSuccessAction.payload.redirect) {
        this.router.navigate(['/']);
      }
      console.log("I am being called")
    })
  );

  @Effect()
  autoLogin = this.actions$.pipe(
    ofType(AuthActions.AUTO_LOGIN),
    map(() => {
      const userData: {
        userId: string;
        email: string;
        isAdmin: boolean
      } = JSON.parse(localStorage.getItem('userData'));
      if (!userData) {
        return { type: 'DUMMY' };
      }
      const loadedUser = new User(
        userData.userId,
        userData.email,
        userData.isAdmin
      );
      return new AuthActions.AuthenticateSuccess({
        email: loadedUser.email,
        userId: loadedUser.userId,
        isAdmin: loadedUser.isAdmin,
        redirect: false
      })
    })
  )

  // TODO: Create an authorize action reducer
  // @Effect()
  // authorizeAdmin = this.actions$.pipe(
  //   ofType(AuthActions.)
  // )

  @Effect({ dispatch: false })
  authenticationLogout = this.actions$.pipe(
    ofType(AuthActions.LOGOUT),
    tap(() => {
      // TODO: Implement a timer
      localStorage.removeItem('userData');
      this.router.navigate(['/login']);
    })
  )
}

/*****************************************************************************
@author
******************************************************************************/

//=============================================================================

import { Component } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { IUserCredentials } from '../../interfaces/IUserCredentials.component';
import { Subscription, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';
import * as fromApp from '../app.reducer'
import * as AuthenticationActions from '../../reducers/authentication.actions'
import * as AUTH_ROUTES from '../authentication/auth.routes';

const LOGIN: string = 'LOGIN';
const SIGNUP: string = 'SIGNUP';

//=============================================================================

@Component ({
    selector: 'app-authentication',
    templateUrl: './authentication.component.html',
    styleUrls: ['./authentication.component.css']
})

//=============================================================================

export class AuthenticationComponent {
  authenticationMode: string = LOGIN;
  pageIsLoading: boolean = false;
  errorMessage : string = null;
  authForm: FormGroup;
  private storeSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private store: Store<fromApp.AppState>) {}

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({'emailIsForbidden': true});
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }

  ngOnInit() {
    const path: string = this.route.routeConfig.path;
    this.authForm = new FormGroup({
      'userData' : new FormGroup({
        'email' : new FormControl(null, [Validators.required, Validators.required ], this.forbiddenEmails),
        'password' : new FormControl(null, [Validators.required, Validators.minLength(6)])
      })
    });
    if (path === "signup") {
      this.authenticationMode = SIGNUP;
    } else {
      this.authenticationMode = LOGIN;
    }
    this.storeSub = this.store.select('authentication').subscribe(authenticationState => {
      this.pageIsLoading = authenticationState.loading;
      this.errorMessage = authenticationState.authError;
      if (this.errorMessage) {
        this.showErrorAlert(this.errorMessage);
      }
    })
  }

  showErrorAlert(errorMessage) {
    console.log(errorMessage);
  }

  onSwitchMode() {
      if (this.authenticationMode === LOGIN) {
        this.authenticationMode = SIGNUP;
        this.location.go(AUTH_ROUTES.ABSOLUTE_PATH_SIGNUP);
      } else {
        this.authenticationMode = LOGIN;
        this.location.go(AUTH_ROUTES.ABSOLUTE_PATH_LOGIN);
      }
      this.errorMessage = null;
      this.authForm.reset();
  }

  ngOnDestroy() {
      if (this.storeSub) { this.storeSub.unsubscribe();}
  }

  onSubmit() {
    if (!this.authForm.valid) { return; }

    const userCredentials: IUserCredentials = {
      email: this.authForm.get('userData').value.email,
      password: this.authForm.get('userData').value.password
    };

    this.loginOrSubmitForm(this.authenticationMode, userCredentials);
    this.authForm.reset();
  }

  //=============================================================================

  private loginOrSubmitForm(mode: string, userCredentials: IUserCredentials) {
    if (mode === LOGIN) {
      this.submitLoginForm(userCredentials);
    } else {
      this.submitSignUpForm(userCredentials);
      this.onSwitchMode();
    }
  }

  private submitLoginForm(userCredentials: IUserCredentials) {
    console.log("attempting to login!");
    this.store.dispatch(
      new AuthenticationActions.LoginStart({
        email: userCredentials.email,
        password: userCredentials.password
      })
    )
  }

  private submitSignUpForm(userCredentials: IUserCredentials) {
    this.store.dispatch(
      new AuthenticationActions.SignupStart({
        email: userCredentials.email,
        password: userCredentials.password
      })
    )
  }
}

//=============================================================================

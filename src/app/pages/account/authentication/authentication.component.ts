import { Component } from '@angular/core'
import { NgForm, FormGroup, FormControl, FormArray, Validators } from '@angular/forms'
import { AuthenticationService } from '../../../../services/authentication.service';
import { IUserCredentials } from '../../../../interfaces/IUserCredentials.component';
import { User } from 'src/models/user.model';
import { Subscription, Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';

const LOGIN: string = 'LOGIN';
const SIGNUP: string = 'SIGNUP';

@Component ({
    selector: 'app-authentication',
    templateUrl: './authentication.component.html',
    styleUrls: ['./authentication.component.css']
})

export class AuthenticationComponent {
    authenticationMode: string = LOGIN;
    pageIsLoading: boolean = false;
    errorMessage : string = null;
    userSubscription: Subscription;
    authForm: FormGroup;

    constructor(
        private authenticationService: AuthenticationService,
        private router: Router,
        private route: ActivatedRoute,
        private location: Location) {}

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
      const path: string = this.route.routeConfig.path

      this.authForm = new FormGroup({
        'userData' : new FormGroup({
          'email' : new FormControl(null, [Validators.required, Validators.required ], this.forbiddenEmails),
          'password' : new FormControl(null, [Validators.required, Validators.minLength(6)])
        })
      })

      if (path === "signup") {
        this.authenticationMode = SIGNUP;
      } else {
        this.authenticationMode = LOGIN;
      }
    }

    onSwitchMode() {
        if (this.authenticationMode === LOGIN) {
          this.authenticationMode = SIGNUP;
          this.location.go("/signup");
        } else {
          this.authenticationMode = LOGIN;
          this.location.go("/login");
        }
        this.errorMessage = null;
        this.authForm.reset();
    }

    ngOnDestroy() {
        if (this.userSubscription != null) {
          this.userSubscription.unsubscribe();
        }
    }

    onSubmit() {
      if (!this.authForm.valid) { return; }
      const userCredentials: IUserCredentials = {
          email: this.authForm.get('userData').value.email,
          password: this.authForm.get('userData').value.password
      };
      this.pageIsLoading = true;
      this.loginOrSubmitForm(this.authenticationMode, userCredentials);
      this.authForm.reset();
    }

    private loginOrSubmitForm(mode: string, userCredentials: IUserCredentials) {
      if (mode === LOGIN) {
        this.submitLoginForm(userCredentials);
      } else {
        this.submitSignUpForm(userCredentials);
        this.onSwitchMode();
      }
    }

    private submitLoginForm(userCredentials: IUserCredentials) {
      this.authenticationService.login(userCredentials)
      .subscribe(
          responseData => { this.handleResponseData(responseData); },
          error => { this.handleError(error); }
      );
    }

    private submitSignUpForm(userCredentials: IUserCredentials) {
      this.authenticationService.signUp(userCredentials)
      .subscribe(
          responseData => { this.handleResponseData(responseData); },
          error => { this.handleError(error);}
      );
    }

    private handleResponseData(responseData) {
      console.log(responseData);
      this.pageIsLoading = false;
    }

    private handleError(error) {
      console.log(error);
      this.errorMessage = "An error occurred.";
      this.pageIsLoading = false;
    }
}

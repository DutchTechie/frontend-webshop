import { Component } from '@angular/core'
import { NgForm } from '@angular/forms'
import { AuthenticationService } from '../../../../services/authentication.service';
import { IUserCredentials } from '../../../../interfaces/IUserCredentials.component';
import { User } from 'src/models/user.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

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
    private userSubscription: Subscription;

    constructor(
        private authenticationService: AuthenticationService,
        private router: Router) {}

    ngOnInit(): void {
        const user = this.getLoggedInUser();
        if (user != null) {
            this.router.navigate(['/']);
        }
    }

    onSwitchMode() {
        if (this.authenticationMode === LOGIN) {
            this.authenticationMode = SIGNUP;
        } else {
            this.authenticationMode = LOGIN;
        }
    }

    ngOnDestroy() {
        if (this.userSubscription != null) {
          this.userSubscription.unsubscribe();
        }
    }

    onSubmit(form: NgForm) {
        if (!form.valid) { return; }
        const userCredentials: IUserCredentials = {
            email: form.value.email,
            password: form.value.password
        };
        this.pageIsLoading = true;
        this.loginOrSubmitForm(this.authenticationMode, userCredentials);
        form.reset();
    }

    private loginOrSubmitForm(mode: string, userCredentials: IUserCredentials) {
        if (mode === LOGIN) {
            this.submitLoginForm(userCredentials);
        } else {
            this.submitSignUpForm(userCredentials);
        }
    }

    private getLoggedInUser(): User {
        let userToAsssignValueTo: User = null;
        this.userSubscription = this.authenticationService.user.subscribe(user => {
          userToAsssignValueTo = user;
        });
        return userToAsssignValueTo;
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
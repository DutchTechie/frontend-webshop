import { Component } from '@angular/core'
import { NgForm } from '@angular/forms'
import { AuthenticationService } from '../../../../services/authentication.service';

interface UserCredentials {
    email: string,
    password: string
}

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

    constructor(private authenticationService: AuthenticationService) {}

    onSwitchMode() {
        if (this.authenticationMode === LOGIN) {
            this.authenticationMode = SIGNUP;
        } else {
            this.authenticationMode = LOGIN;
        }
    }

    onSubmit(form: NgForm) {
        if (!form.valid) { return; }
        
        const userCredentials: UserCredentials = {
            email: form.value.email,
            password: form.value.password
        };
        this.pageIsLoading = true;

        if (this.authenticationMode === LOGIN) {
            this.submitLoginForm(userCredentials);
        } else {
            this.submitSignUpForm(userCredentials);
        }
        form.reset();
    }

    private submitLoginForm(userCredentials: UserCredentials) {
        this.authenticationService.login(userCredentials.email, userCredentials.password)
        .subscribe(
            responseData => { this.handleResponseData(responseData); },
            error => { this.handleError(error); }
        );
    }

    private submitSignUpForm(userCredentials: UserCredentials) {
        this.authenticationService.signUp(userCredentials.email, userCredentials.password)
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
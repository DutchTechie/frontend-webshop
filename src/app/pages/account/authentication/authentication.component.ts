import { Component } from '@angular/core'
import { NgForm } from '@angular/forms'
import { AuthenticationService } from '../../../../services/authentication.service';

@Component ({
    selector: 'app-authentication',
    templateUrl: './authentication.component.html',
    styleUrls: ['./authentication.component.css']
})

export class AuthenticationComponent {
    isLoginMode = true
    isLoading = false
    error : string = null

    constructor(private authenticationService: AuthenticationService) {}

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode
    }

    onSubmit(form: NgForm) {
        if (!form.valid) {
            return
        }
        const email = form.value.email
        const password = form.value.password
        this.isLoading = true

        if (this.isLoginMode) {
            this.authenticationService.login(email, password).subscribe(
                resData => {
                    this.isLoading = false
                },
                error => {
                    console.log(error)
                    this.error = "An error occurred."
                    this.isLoading = false
                }
            )
            form.reset()
        } else {
            this.authenticationService.signUp(email, password).subscribe(
                resData => {
                    this.isLoading = false
                },
                error => {
                    console.log(error)
                    this.error = "An error occurred."
                    this.isLoading = false
                }
            )
            form.reset()
        }
    }
}
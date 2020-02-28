import { Component } from '@angular/core'
import { NgForm } from '@angular/forms'
import { AuthService } from '../../../services/auth.service';

@Component ({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})

export class AuthComponent {
    isLoginMode = true
    isLoading = false
    error : string = null

    constructor(private authService: AuthService) {}

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
            this.authService.login(email, password).subscribe(
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
            this.authService.signUp(email, password).subscribe(
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
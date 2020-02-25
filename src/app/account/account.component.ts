import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  private userSub : Subscription;
  user: User = null
  clickedUpdate: boolean = false
  
  // TODO: Create a user's info model
  userInfo = {
    name: null,
    address: null,
    zipCode: null,
    country: null,
    phone: null,
  }

  constructor(private authService: AuthService) { }

  // TODO: Add functionality to recieve user details, such as shipping addresses etc.
  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
      if (user == null) {
        return
      }
      this.user = user
    })
  }

  ngOnDestroy() {
    this.userSub.unsubscribe()
  }

  hideAccountUpdateForm() {
    this.clickedUpdate = false
  }

  displayAccountUpdateForm() {
    this.clickedUpdate = true
  }

  deleteAccount() {
    let status = confirm('Are you sure?')
    if (status) {
      console.log("delete account")
      this.authService.logout()
      this.authService.deleteUserAccount()
    }
  }

  // TODO: Complete the following method
  onSubmit(form: NgForm) {
    console.log("submitted form")
    if (!form.valid) {
        return
    }
  }

  // TODO: We probably need to send information to the auth service
  updateUserAccount() {
    this.authService.updateUserAccount()
  }

}

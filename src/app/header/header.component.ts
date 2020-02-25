import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy {
  private userSub : Subscription;
  isAuthenticated = false;
  userEmail = null
  isAdmin = false
  
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
      if (user == null) {
        return
      }
      this.userEmail = user.userEmail
      this.isAdmin = user.isAdmin
    })
  }

  onLogout() {
    this.authService.logout()
  }

  onClickAccount() {
    this.authService.handleOnAccountLinkClicked()
  }

  ngOnDestroy() {
    this.userSub.unsubscribe()
    this.isAdmin = false
  }

}

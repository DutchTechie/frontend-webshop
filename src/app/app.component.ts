import { Component, NgModule } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent {
  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.authService.autoLogin()
  }
}

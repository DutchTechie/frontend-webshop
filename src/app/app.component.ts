import { Component, NgModule } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from './app.reducer'
import * as AuthActions from '../reducers/authentication.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent {
  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(new AuthActions.AutoLogin());
  }
}

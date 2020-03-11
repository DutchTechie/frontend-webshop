import { IUserCredentials } from '../interfaces/IUserCredentials.component';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http'
import { Subject, throwError, BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';
import { catchError, tap, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import * as fromApp from '../app/app.reducer'
import * as AuthenticationActions from '../reducers/authentication.actions'
import { Store } from '@ngrx/store';

// We won't be using this class. Instead, we'll have to do everything in the
// effects class instead. Also, check the reducers and actions.

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

}

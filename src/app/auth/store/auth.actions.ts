/*****************************************************************************
@author
******************************************************************************/

//=============================================================================

import { Action } from '@ngrx/store';

export const LOGIN_START = '[Auth] Login Start';
export const LOGOUT = '[Auth] Logout';
export const SIGNUP_START = '[Auth] Signup Start';
export const AUTO_LOGIN = '[Auth] Auto Login';
export const SIGN_UP_SUCCESS = '[Auth] Sign Up Success';
export const AUTHENTICATE_SUCCESS = '[Auth] Login';
export const AUTHENTICATE_FAIL = '[Auth] Login Fail';
export const CLEAR_ERROR = '[Auth] Clear Error';
export const CLEAR_SUCCESS_STATUS = '[Auth] Clear Success Status';

//=============================================================================

export class SignUpSuccess implements Action {
  readonly type = SIGN_UP_SUCCESS;
}

export class ClearSuccessStatus implements Action {
  readonly type = CLEAR_SUCCESS_STATUS;
}

export class AuthenticateSuccess implements Action {
  readonly type = AUTHENTICATE_SUCCESS;

  constructor(
    public payload: {
      userId: string;
      email: string;
      isAdmin: boolean;
      redirect: boolean;
    }
  ) {}
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export class LoginStart implements Action {
  readonly type = LOGIN_START;

  constructor(public payload: { email: string, password: string }) {}
}

export class AuthenticateFail implements Action {
  readonly type = AUTHENTICATE_FAIL;

  constructor(public payload: string) {}
}

export class SignupStart implements Action {
  readonly type = SIGNUP_START;

  constructor(public payload: { email: string, password: string }) {}
}

export class ClearError implements Action {
  readonly type = CLEAR_ERROR;
}

export class AutoLogin implements Action {
  readonly type = AUTO_LOGIN;
}

export type AuthenticationActions =
  | AuthenticateSuccess
  | Logout
  | LoginStart
  | AuthenticateFail
  | SignupStart
  | ClearError
  | AutoLogin
  | SignUpSuccess
  | ClearSuccessStatus

//=============================================================================

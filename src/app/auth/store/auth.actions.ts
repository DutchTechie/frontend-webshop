/*****************************************************************************
@author
******************************************************************************/

//=============================================================================

import { Action } from '@ngrx/store';

export const LOGIN_START = '[Authentication] Login Start';
export const LOGOUT = '[Authentication] Logout';
export const SIGNUP_START = '[Authentication] Signup Start';
export const AUTO_LOGIN = '[Authentication] Auto Login';
export const SIGN_UP_SUCCESS = '[Authentication] Sign Up Success';
export const AUTHENTICATE_SUCCESS = '[Authentication] Login';
export const AUTHENTICATE_FAIL = '[Authentication] Login Fail';
export const CLEAR_ERROR = '[Authentication] Clear Error';
export const CLEAR_SIGN_UP_STATUS = '[Authentication] Clear Sign Up Status';

//=============================================================================

export class SignUpSuccess implements Action {
  readonly type = SIGN_UP_SUCCESS;
}

export class ClearSignUpStatus implements Action {
  readonly type = CLEAR_SIGN_UP_STATUS;
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
  | ClearSignUpStatus

//=============================================================================

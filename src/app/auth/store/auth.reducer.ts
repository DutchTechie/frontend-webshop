import { User } from 'src/models/user.model';
import * as AuthenticationActions from './auth.actions';

export interface State {
  user: User;
  authError: string;
  signUpStatus: string;
  loading: boolean;
}

const initialState: State = {
  user: null,
  authError: null,
  signUpStatus: null,
  loading: false
}

export function authenticationReducer(
  state = initialState,
  action: AuthenticationActions.AuthenticationActions
) {
  switch (action.type) {
    case AuthenticationActions.AUTHENTICATE_SUCCESS:
      const user = new User(
        action.payload.userId,
        action.payload.email,
        action.payload.isAdmin
      );

      return {
        ...state,
        user: user,
        authError: null,
        loading: false
      };

    case AuthenticationActions.LOGOUT:
      return {
        ...state,
        user: null
      };

    case AuthenticationActions.LOGIN_START:
    case AuthenticationActions.SIGNUP_START:
      return {
        ...state,
        authError: null,
        loading: true
      };

    case AuthenticationActions.AUTHENTICATE_FAIL:
      return {
        ...state,
        user: null,
        authError: action.payload,
        loading: false
      };

    case AuthenticationActions.SIGN_UP_SUCCESS:
      return {
        ...state,
        signUpStatus: "Thanks! Your account has been successfully created.",
        loading: false,
        authError: null
      };

    case AuthenticationActions.CLEAR_ERROR:
      return {
        ...state,
        authError: null
      };

    case AuthenticationActions.CLEAR_SIGN_UP_STATUS:
      return {
        ...state,
        signUpStatus: null
      };

    default:
      return state;
  }
}

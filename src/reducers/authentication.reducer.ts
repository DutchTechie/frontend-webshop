import { User } from 'src/models/user.model';
import * as AuthenticationActions from './authentication.actions';

export interface State {
  user: User;
  authError: string;
  loading: boolean;
}

const initialState: State = {
  user: null,
  authError: null,
  loading: false
}

// The spread operator (...) allows us to copy objects and change a few
// properties
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
        loading: false
      };

    case AuthenticationActions.AUTHENTICATE_FAIL:
      return {
        ...state,
        user: null,
        authError: action.payload,
        loading: false
      };

    case AuthenticationActions.CLEAR_ERROR:
      return {
        ...state,
        authError: null
      };

    default:
      return state;
  }
}

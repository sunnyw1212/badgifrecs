import {
  REGISTER_USER_LOAD,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOGIN_USER_LOAD,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGOUT
} from '../constants/';

import { loadState } from '../snippets/helpers';

let persistedState = null;

if (loadState()) {
  persistedState = loadState().currentUser.user;
}

const INITIAL_STATE = {
  currentUser: {
    user: persistedState,
    error: null,
    loading: false
  }
};

export default function(state = INITIAL_STATE, action) {
  console.log('HERES THE INITIAL_STATE IN USER REDUCER', INITIAL_STATE);
  console.log('got a user action', action);

  let error;
  switch (action.type) {
    case REGISTER_USER_LOAD:
      console.log('registerUserLoad');
      return Object.assign({}, state, {
        currentUser: {
          user: null,
          error: null,
          loading: true
        }
      });

    case REGISTER_USER_SUCCESS:
      console.log(
        'heres the data for REGISTER_USER_SUCCESS',
        action.payload.data
      );
      return Object.assign({}, state, {
        currentUser: {
          user: action.payload.data,
          error: null,
          loading: false
        }
      });

    case REGISTER_USER_FAIL:
      console.log('failed register user REGISTERUSERFAAIL ', action.payload);
      error = action.payload;
      return Object.assign({}, state, {
        currentUser: {
          user: null,
          error: error,
          loading: false
        }
      });

    case LOGIN_USER_LOAD:
      console.log('loginUserLoad');
      return Object.assign({}, state, {
        currentUser: {
          user: null,
          error: null,
          loading: true
        }
      });

    case LOGIN_USER_SUCCESS:
      console.log('heres the data for LOGIN USER SEUCESS', action.payload.data);
      return Object.assign({}, state, {
        currentUser: {
          user: action.payload.data,
          error: null,
          loading: false
        }
      });

    case LOGIN_USER_FAIL:
      console.log('failed login user', action.payload);
      error = action.payload;
      return Object.assign({}, state, {
        currentUser: {
          user: null,
          error: error,
          loading: false
        }
      });

    case LOGOUT:
      console.log('LOGGED OUT IN REDUCER');
      return Object.assign({}, state, {
        currentUser: {
          user: null,
          error: null,
          loading: false
        }
      });

    default:
      return state;
  } //end switch
} //end export default function

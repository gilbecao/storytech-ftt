import { createReducer, on } from '@ngrx/store';

import {
  login,
  loginFailure,
  loginSuccess,
  logout,
  logoutFailure,
  logoutSuccess,
} from './auth.actions';

export interface AuthState {
  logged: boolean;
}

export const initialState: AuthState = {
  logged: false,
};

export const authFeatureKey = 'auth';

export const authReducer = createReducer(
  initialState,
  on(login, (state) => ({ ...state, loading: true })),
  on(loginSuccess, (state) => ({ ...state, loading: false, logged: true })),
  on(loginFailure, (state) => ({ ...state, loading: false, logged: false })),
  on(logout, (state) => ({ ...state, loading: true })),
  on(logoutSuccess, (state) => ({ ...state, loading: false, logged: false })),
  on(logoutFailure, (state) => ({ ...state, loading: false, logged: true }))
);

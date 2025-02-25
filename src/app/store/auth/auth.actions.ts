import { createAction } from '@ngrx/store';

export const login = createAction('[Auth] Login');
export const loginSuccess = createAction('[Auth] Login Success');
export const loginFailure = createAction('[Auth] Login Failure');

export const logout = createAction('[Auth] Logout ');
export const logoutSuccess = createAction('[Auth] Logout Success');
export const logoutFailure = createAction('[Auth] Logout Failure');

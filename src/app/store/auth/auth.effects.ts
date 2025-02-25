import { Injectable, inject } from '@angular/core';
import { VehicleService } from '../../core/services/vehicle.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, map, of } from 'rxjs';
import {
  login,
  loginFailure,
  loginSuccess,
  logout,
  logoutFailure,
  logoutSuccess,
} from './auth.actions';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private vehicleService = inject(VehicleService);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      map(() => loginSuccess()),
      catchError((error) => of(loginFailure()))
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logout),
      map(() => logoutSuccess()),
      catchError((error) => of(logoutFailure()))
    )
  );
}

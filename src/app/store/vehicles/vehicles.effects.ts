import { Injectable, inject } from '@angular/core';
import { VehicleService } from '../../core/services/vehicle.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  loadVehicleDetails,
  loadVehicleDetailsFailure,
  loadVehicleDetailsSuccess,
  loadVehicles,
  loadVehiclesFailure,
  loadVehiclesSuccess,
} from './vehicles.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { Vehicle } from '../../shared/models/vehicle.model';

@Injectable()
export class VehiclesEffects {
  private actions$ = inject(Actions);
  private vehicleService = inject(VehicleService);

  loadVehicles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadVehicles),
      mergeMap(() =>
        this.vehicleService.getVehicles().pipe(
          map((vehicles) =>
            loadVehiclesSuccess({ vehicles: vehicles as Vehicle[] })
          ),
          catchError((error) => of(loadVehiclesFailure({ error })))
        )
      )
    )
  );

  loadVehicleDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadVehicleDetails),
      mergeMap(({ apiUrl }) =>
        this.vehicleService.getVehicleDetails(apiUrl).pipe(
          map((vehicle) =>
            loadVehicleDetailsSuccess({ vehicle: vehicle as Vehicle })
          ),
          catchError((error) => of(loadVehicleDetailsFailure({ error })))
        )
      )
    )
  );
}

import { createAction, props } from '@ngrx/store';
import { Vehicle } from '../../shared/classes/vehicle';

export const loadVehicles = createAction('[Vehicle] Load Vehicles');
export const loadVehiclesSuccess = createAction(
  '[Vehicle] Load Vehicles Success',
  props<{ vehicles: Vehicle[] }>()
);
export const loadVehiclesFailure = createAction(
  '[Vehicle] Load Vehicles Failure',
  props<{ error: any }>()
);

export const loadVehicleDetails = createAction(
  '[Vehicle] Load Vehicle Details',
  props<{ id: string; apiUrl: string }>()
);
export const loadVehicleDetailsSuccess = createAction(
  '[Vehicle] Load Vehicle Details Success',
  props<{ vehicle: Vehicle }>()
);
export const loadVehicleDetailsFailure = createAction(
  '[Vehicle] Load Vehicle Details Failure',
  props<{ error: any }>()
);

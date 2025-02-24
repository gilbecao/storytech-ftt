import { createReducer, on } from '@ngrx/store';
import {
  loadVehicleDetails,
  loadVehicleDetailsFailure,
  loadVehicleDetailsSuccess,
  loadVehicles,
  loadVehiclesFailure,
  loadVehiclesSuccess,
} from './vehicles.actions';
import { Vehicle } from '../../shared/classes/vehicle';

export interface VehiclesState {
  vehicles: Vehicle[];
  vehicleDetails: { [id: string]: Vehicle };
  loading: boolean;
  error: any;
}

export const initialState: VehiclesState = {
  vehicles: [],
  vehicleDetails: {},
  loading: false,
  error: null,
};

export const vehiclesFeatureKey = 'vehicles';

export const vehiclesReducer = createReducer(
  initialState,
  on(loadVehicles, (state) => ({ ...state, loading: true })),
  on(loadVehiclesSuccess, (state, { vehicles }) => ({
    ...state,
    vehicles,
    loading: false,
  })),
  on(loadVehiclesFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(loadVehicleDetails, (state) => ({ ...state, loading: true })),
  on(loadVehicleDetailsSuccess, (state, { vehicle }) => ({
    ...state,
    vehicleDetails: {
      ...state.vehicleDetails,
      [vehicle.id]: {
        ...state.vehicles.find((v) => v.id === vehicle.id),
        ...state.vehicleDetails[vehicle.id],
        ...vehicle,
      },
    },
    loading: false,
  })),
  on(loadVehicleDetailsFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);

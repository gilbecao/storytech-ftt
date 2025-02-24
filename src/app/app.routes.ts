import { Routes } from '@angular/router';
import { VehiclesComponent } from './features/vehicles/vehicles.component';
import { provideState } from '@ngrx/store';
import {
  vehiclesFeatureKey,
  vehiclesReducer,
} from './store/vehicles/vehicles.reducer';

export const routes: Routes = [
  { path: '', component: VehiclesComponent },
  {
    path: 'vehicles',
    component: VehiclesComponent,
    providers: [
      provideState({
        name: vehiclesFeatureKey,
        reducer: vehiclesReducer,
      }),
    ],
  },
];

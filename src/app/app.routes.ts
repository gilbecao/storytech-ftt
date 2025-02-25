import { Routes } from '@angular/router';
import { VehiclesComponent } from './features/vehicles/vehicles.component';
import { provideState } from '@ngrx/store';
import {
  vehiclesFeatureKey,
  vehiclesReducer,
} from './store/vehicles/vehicles.reducer';
import { HomeComponent } from './features/home/home.component';
import { PageNotFoundComponent } from './features/page-not-found/page-not-found.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'models',
    component: VehiclesComponent,
    providers: [
      provideState({
        name: vehiclesFeatureKey,
        reducer: vehiclesReducer,
      }),
    ],
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

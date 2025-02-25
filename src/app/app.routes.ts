import { Routes } from '@angular/router';
import { VehiclesComponent } from './features/vehicles/vehicles.component';
import { provideState } from '@ngrx/store';
import {
  vehiclesFeatureKey,
  vehiclesReducer,
} from './store/vehicles/vehicles.reducer';
import { HomeComponent } from './features/home/home.component';
import { PageNotFoundComponent } from './features/page-not-found/page-not-found.component';
import { AuthGuard } from './core/guards/auth.guard';

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
    /*  canActivate: [AuthGuard], */
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

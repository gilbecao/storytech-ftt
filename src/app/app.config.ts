import {
  ApplicationConfig,
  provideZoneChangeDetection,
  isDevMode,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch } from '@angular/common/http';
import {
  vehiclesFeatureKey,
  vehiclesReducer,
} from './store/vehicles/vehicles.reducer';
import { VehiclesEffects } from './store/vehicles/vehicles.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch()),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore({
      [vehiclesFeatureKey]: vehiclesReducer,
    }),
    provideEffects([VehiclesEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideAnimationsAsync(),
  ],
};

import { Component, inject, signal, WritableSignal } from '@angular/core';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';
import { VehiclesState } from '../../store/vehicles/vehicles.reducer';
import {
  loadVehicleDetails,
  loadVehicles,
} from '../../store/vehicles/vehicles.actions';
import { VehicleDetailsModalComponent } from './components/vehicle-details-modal/vehicle-details-modal.component';
import { VehicleImageComponent } from './components/vehicle-image/vehicle-image.component';
import { Vehicle } from '../../shared/classes/vehicle';

@Component({
  selector: 'app-vehicles',
  imports: [CommonModule, VehicleDetailsModalComponent, VehicleImageComponent],
  templateUrl: './vehicles.component.html',
  styleUrl: './vehicles.component.scss',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class VehiclesComponent {
  vehicles$: WritableSignal<Vehicle[]> = signal([]);
  vehicleDetails$: WritableSignal<{ [id: string]: Vehicle }> = signal({});
  loading$: WritableSignal<boolean> = signal(false);
  selectedVehicle: Vehicle | null = null;
  expandedVehicles = new Set<string>();

  private store = inject(Store<{ vehicles: VehiclesState }>);

  ngOnInit() {
    this.store
      .select((state) => state.vehicles)
      .subscribe((state) => {
        this.vehicles$.set(state.vehicles);
        this.vehicleDetails$.set(state.vehicleDetails);
        this.loading$.set(state.loading);
      });

    this.store.dispatch(loadVehicles());
  }

  toggleVehicleDetails(vehicle: Vehicle) {
    if (!this.vehicleDetails$()[vehicle.id]) {
      this.store.dispatch(
        loadVehicleDetails({ id: vehicle.id, apiUrl: vehicle.apiUrl })
      );

      const subscription = this.store
        .select((state) => state.vehicles.vehicleDetails[vehicle.id])
        .subscribe((details) => {
          if (details) {
            this.selectedVehicle = new Vehicle(details);
            subscription.unsubscribe();
          }
        });
    } else {
      this.selectedVehicle = this.vehicleDetails$()[vehicle.id];
    }
  }

  deselectVehicle() {
    this.selectedVehicle = null;
  }
}

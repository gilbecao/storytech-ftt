import { Component, inject, signal, WritableSignal } from '@angular/core';
import { Store } from '@ngrx/store';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';
import { Vehicle } from '../../shared/models/vehicle.model';
import { VehiclesState } from '../../store/vehicles/vehicles.reducer';
import {
  loadVehicleDetails,
  loadVehicles,
} from '../../store/vehicles/vehicles.actions';

@Component({
  selector: 'app-vehicles',
  imports: [CommonModule, NgOptimizedImage],
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

  onImageError(event: Event, ratio: string) {
    const img = event.target as HTMLImageElement;
    img.src = `images/${ratio}/no-image.jpg`;
  }

  getVehicleImageUrl(vehicle: Vehicle, ratio: string): string {
    return (
      vehicle.media.find((m) => m.url.includes(ratio))?.url ||
      `images/${ratio}/no-image.jpg`
    );
  }

  toggleVehicleDetails(vehicle: Vehicle) {
    if (this.expandedVehicles.has(vehicle.id)) {
      this.expandedVehicles.delete(vehicle.id);
    } else {
      if (!this.vehicleDetails$()[vehicle.id]) {
        this.store.dispatch(
          loadVehicleDetails({ id: vehicle.id, apiUrl: vehicle.apiUrl })
        );
      }
      this.expandedVehicles.add(vehicle.id);
    }
  }
}

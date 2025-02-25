import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { VehicleImageComponent } from '../vehicle-image/vehicle-image.component';
import { Vehicle } from '../../../../shared/classes/vehicle';

@Component({
  selector: 'app-vehicle-details-modal',
  imports: [CommonModule, VehicleImageComponent],
  templateUrl: './vehicle-details-modal.component.html',
  styleUrl: './vehicle-details-modal.component.scss',
})
export class VehicleDetailsModalComponent {
  @Input() vehicle: Vehicle = new Vehicle();
  @Output() close = new EventEmitter<void>();

  closeModal() {
    this.close.emit();
  }
}

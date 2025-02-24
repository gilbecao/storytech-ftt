import { VehicleMedia } from '../models/vehicle-media.model';
import { VehicleMeta } from './vehicle-meta';

export class Vehicle {
  apiUrl: string;
  id: string;
  media: VehicleMedia[];
  modelYear: string;
  name: string;
  description: string;
  price: string;
  meta: VehicleMeta;

  constructor(vehicle?: Partial<Vehicle>) {
    this.id = vehicle?.id || '';
    this.name = vehicle?.name || 'Unknown';
    this.modelYear = vehicle?.modelYear || '';
    this.apiUrl = vehicle?.apiUrl || '';
    this.media = vehicle?.media ?? [];
    this.description = vehicle?.description || '';
    this.price = vehicle?.price || 'N/A';
    this.meta = new VehicleMeta(vehicle?.meta);
  }
}

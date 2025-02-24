export interface Vehicle {
  id: string;
  name: string;
  description: string;
  price: string;
  modelYear: string;
  apiUrl: string;
  media: VehicleMedia[];
  meta: VehicleMeta;
}

export interface VehicleMeta {
  passengers: number;
  drivetrain: string[];
  bodystyles: string[];
  emissions: EmissionInfo;
}

export interface EmissionInfo {
  template: string;
  value: number;
}

export interface VehicleMedia {
  name: string;
  url: string;
}

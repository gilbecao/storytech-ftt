import { VehicleEmissionInfo } from './vehicle-emission-info';

export class VehicleMeta {
  passengers: number;
  drivetrain: string[];
  bodystyles: string[];
  emissions: VehicleEmissionInfo;

  constructor(meta?: Partial<VehicleMeta>) {
    this.passengers = meta?.passengers || 0;
    this.drivetrain = meta?.drivetrain || [];
    this.bodystyles = meta?.bodystyles || [];
    this.emissions = new VehicleEmissionInfo(meta?.emissions);
  }
}

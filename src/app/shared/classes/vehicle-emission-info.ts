export class VehicleEmissionInfo {
  template: string;
  value: number;

  constructor(emissionInfo?: Partial<VehicleEmissionInfo>) {
    this.template = emissionInfo?.template || '';
    this.value = emissionInfo?.value || 0;
  }
}

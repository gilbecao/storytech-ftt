import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { Vehicle } from '../../shared/classes/vehicle';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  // TODO - move to environment file
  private baseUrl =
    'https://frontend-code-test-api-1023992580432.europe-west2.run.app';

  constructor(private http: HttpClient) {}

  getVehicles() {
    return this.http.get<Vehicle[]>(`${this.baseUrl}/api/vehicles`);
  }

  getVehicleDetails(apiUrl: string) {
    return this.http.get<Vehicle>(`${this.baseUrl}${apiUrl}`);
  }
}

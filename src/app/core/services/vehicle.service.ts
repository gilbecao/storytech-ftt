import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vehicle } from '../../shared/models/vehicle.model';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  private baseUrl =
    'https://frontend-code-test-api-1023992580432.europe-west2.run.app';

  constructor(private http: HttpClient) {}

  getVehicles(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(`${this.baseUrl}/api/vehicles`);
  }

  getVehicleDetails(apiUrl: string): Observable<Vehicle> {
    return this.http.get<Vehicle>(`${this.baseUrl}${apiUrl}`);
  }
}

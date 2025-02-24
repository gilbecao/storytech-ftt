import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  private baseUrl =
    'https://frontend-code-test-api-1023992580432.europe-west2.run.app';

  constructor(private http: HttpClient) {}

  getVehicles() {
    return this.http.get<[]>(`${this.baseUrl}/api/vehicles`);
  }

  getVehicleDetails(apiUrl: string) {
    return this.http.get(`${this.baseUrl}${apiUrl}`);
  }
}

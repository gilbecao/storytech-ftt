import { TestBed } from '@angular/core/testing';

import { VehicleService } from './vehicle.service';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { firstValueFrom, of } from 'rxjs';
import { Vehicle } from '../../shared/classes/vehicle';

const expectedVehicle = {
  id: 'xe',
  name: 'JAGUAR XE',
  modelYear: 'k17',
  apiUrl: '/api/vehicles/xe',
  media: [
    {
      name: 'vehicle',
      url: '/images/16x9/xe_k17.jpg',
    },
    {
      name: 'vehicle',
      url: '/images/1x1/xe_k17.jpg',
    },
  ],
  description:
    'The most advanced, efficient and refined sports saloon that Jaguar has ever produced',
  price: '£30,000',
  meta: {
    passengers: 5,
    drivetrain: ['AWD', 'RWD'],
    bodystyles: ['saloon'],
    emissions: {
      template: 'CO2 Emissions $value g/km',
      value: 99,
    },
  },
} as Vehicle;
const expectedVehicles = [expectedVehicle];

describe('VehicleService', () => {
  let httpTesting: HttpTestingController;
  let service: VehicleService;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('HttpClient', ['get']);
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(VehicleService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    TestBed.inject(HttpTestingController).verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return vehicles', async () => {
    const url =
      'https://frontend-code-test-api-1023992580432.europe-west2.run.app/api/vehicles';

    const getVehicles$ = service.getVehicles();

    const vehiclesPromise = firstValueFrom(getVehicles$);

    const req = httpTesting.expectOne(url, 'get vehicles');
    expect(req.request.method).toBe('GET');

    req.flush(expectedVehicles);

    expect(await vehiclesPromise).toEqual(expectedVehicles);

    httpTesting.verify();
  });

  it('should return vehicle details', (done: DoneFn) => {
    const getVehicleDetails$ = service.getVehicleDetails(
      expectedVehicle.apiUrl
    );

    const vehicleDetailsPromise = firstValueFrom(getVehicleDetails$);

    const req = httpTesting.expectOne(
      `https://frontend-code-test-api-1023992580432.europe-west2.run.app${expectedVehicle.apiUrl}`,
      'get vehicle details'
    );
    expect(req.request.method).toBe('GET');

    req.flush(expectedVehicle);

    vehicleDetailsPromise.then((details) => {
      expect(details).toEqual(expectedVehicle);
      done();
    });

    httpTesting.verify();
  });
});

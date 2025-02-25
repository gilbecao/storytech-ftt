import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { VehiclesComponent } from './vehicles.component';
import {
  initialState,
  VehiclesState,
} from '../../store/vehicles/vehicles.reducer';
import {
  loadVehicleDetails,
  loadVehicles,
} from '../../store/vehicles/vehicles.actions';
import { Vehicle } from '../../shared/classes/vehicle';
import { of } from 'rxjs';

describe('VehiclesComponent', () => {
  let component: VehiclesComponent;
  let fixture: ComponentFixture<VehiclesComponent>;
  let store: MockStore<{ vehicles: VehiclesState }>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehiclesComponent],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(VehiclesComponent);
    fixture.autoDetectChanges();
    component = fixture.componentInstance;
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadVehicles action on init', () => {
    const spy = spyOn(store, 'dispatch');
    component.ngOnInit();
    expect(spy).toHaveBeenCalledOnceWith(loadVehicles());
  });

  it('should update signals when store state changes', () => {
    const mockVehicles = [new Vehicle({ id: '1', name: 'Jaguar F-Type' })];
    store.setState({
      vehicles: {
        vehicles: mockVehicles,
        vehicleDetails: {},
        loading: false,
        error: null,
      },
    });
    store.refreshState();

    expect(component.vehicles$()).toEqual(mockVehicles);
  });

  xit('should dispatch loadVehicleDetails if vehicle details are not in store', () => {
    spyOn(store, 'dispatch');
    const vehicle = new Vehicle({ id: '1', apiUrl: '/api/vehicles/1' });

    component.toggleVehicleDetails(vehicle);

    expect(store.dispatch).toHaveBeenCalledWith(
      loadVehicleDetails({ id: vehicle.id, apiUrl: vehicle.apiUrl })
    );
  });

  it('should set selectedVehicle when vehicle details are loaded', () => {
    const vehicle = new Vehicle({ id: '1', name: 'Jaguar F-Type' });
    const details = new Vehicle({ id: '1', description: 'Luxury sports car' });

    store.setState({
      vehicles: {
        vehicles: [vehicle],
        vehicleDetails: { '1': details },
        loading: false,
        error: null,
      },
    });
    store.refreshState();

    component.toggleVehicleDetails(vehicle);

    expect(component.selectedVehicle).toEqual(details);
  });

  it('should not dispatch loadVehicleDetails if vehicle details already exist', () => {
    spyOn(store, 'dispatch');
    const vehicle = new Vehicle({ id: '1', apiUrl: '/api/vehicles/1' });
    store.setState({
      vehicles: {
        vehicles: [vehicle],
        vehicleDetails: { '1': vehicle },
        loading: false,
        error: null,
      },
    });
    store.refreshState();

    component.toggleVehicleDetails(vehicle);

    expect(store.dispatch).not.toHaveBeenCalledWith(
      loadVehicleDetails({ id: vehicle.id, apiUrl: vehicle.apiUrl })
    );
  });

  xit('should unsubscribe from vehicleDetails subscription after receiving data', () => {
    spyOn(store, 'select').and.returnValue(
      of(new Vehicle({ id: '1', description: 'Luxury car' }))
    );
    const vehicle = new Vehicle({ id: '1' });

    component.toggleVehicleDetails(vehicle);

    expect(component.selectedVehicle?.description).toEqual('Luxury car');
  });

  it('should set selectedVehicle to null when deselectVehicle is called', () => {
    component.selectedVehicle = new Vehicle({ id: '1', name: 'Jaguar XE' });

    component.deselectVehicle();

    expect(component.selectedVehicle).toBeNull();
  });
});

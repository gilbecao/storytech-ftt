import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleDetailsModalComponent } from './vehicle-details-modal.component';
import { By } from '@angular/platform-browser';

describe('VehicleDetailsModalComponent', () => {
  let component: VehicleDetailsModalComponent;
  let fixture: ComponentFixture<VehicleDetailsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleDetailsModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VehicleDetailsModalComponent);
    fixture.autoDetectChanges();
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close modal', async () => {
    const closeSpy = spyOn(component.close, 'emit');
    const closeButton = fixture.debugElement.query(By.css('.modal-close'));
    closeButton.nativeElement.click();
    await fixture.whenStable();

    expect(closeSpy).toHaveBeenCalled();
  });
});

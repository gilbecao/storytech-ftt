import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleImageComponent } from './vehicle-image.component';

describe('VehicleImageComponent', () => {
  let component: VehicleImageComponent;
  let fixture: ComponentFixture<VehicleImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleImageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VehicleImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set image url', () => {
    component.media = [
      {
        name: 'vehicle',
        url: '/images/16x9/xe_k17.jpg',
      },
      {
        name: 'vehicle',
        url: '/images/1x1/xe_k17.jpg',
      },
    ];
    fixture.detectChanges();

    const img = fixture.nativeElement.querySelector('img');
    expect(img.src).toContain('/images/16x9/xe_k17.jpg');
  });

  it('should set no-image', () => {
    component.media = [
      {
        name: 'vehicle',
        url: '',
      },
    ];
    fixture.detectChanges();

    const img = fixture.nativeElement.querySelector('img');
    expect(img.src).toContain('no-image.jpg');
  });

  it('should replace image on error', () => {
    const mockEvent = {
      target: document.createElement('img'),
    } as unknown as Event;

    const imgElement = mockEvent.target as HTMLImageElement;
    imgElement.src = '/images/16x9/xe_k17.jpg';

    component.onImageError(mockEvent, '1x1');

    expect(imgElement.src).toContain('no-image.jpg');
  });
});

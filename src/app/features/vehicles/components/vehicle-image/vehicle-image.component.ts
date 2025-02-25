import { Component, Input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { VehicleMedia } from '../../../../shared/models/vehicle-media.model';

@Component({
  selector: 'app-vehicle-image',
  imports: [NgOptimizedImage],
  templateUrl: './vehicle-image.component.html',
  styleUrl: './vehicle-image.component.scss',
})
export class VehicleImageComponent {
  @Input() media: VehicleMedia[] = [];
  @Input() vehicleId: string = '';
  @Input() priority: boolean = false;

  onImageError(event: Event, ratio: string) {
    const img = event.target as HTMLImageElement;
    img.src = `images/${ratio}/no-image.jpg`;
  }

  getVehicleImageUrl(media: VehicleMedia[], ratio: string): string {
    if (!media?.length) {
      return `images/${ratio}/no-image.jpg`;
    }
    return (
      media.find((m) => m.url.includes(ratio))?.url ||
      `images/${ratio}/no-image.jpg`
    );
  }
}

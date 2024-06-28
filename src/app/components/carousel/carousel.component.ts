import { Component, Input } from '@angular/core';
import type { CarouselImg } from 'src/app/models/img';

@Component({
  selector: 'carousel',
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css',
})
export class CarouselComponent {
  @Input() imgs!: CarouselImg[];
}

import { Component, Input } from '@angular/core';
import { CarouselImg } from 'src/app/shared/interfaces/CarouselImg';

@Component({
  selector: 'carousel',
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css',
})
export class CarouselComponent {
  @Input() imgs!: CarouselImg[];
}

import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { tns } from 'tiny-slider/src/tiny-slider';
import { Device, screenSizes } from '../../../core/services/media-query.service';


let count = 0;

@Component({
  selector: 'app-video-slider',
  templateUrl: './video-slider.component.html',
  styleUrls: [
    './video-slider.component.scss',
  ]
})
export class VideoSliderComponent implements OnInit, AfterViewInit {
  @Input() public videoList = [];
  public id = 'project-slider' + count;

  constructor() {
    count++;
  }

  ngOnInit() {
    console.log('tns=>', tns);
  }

  ngAfterViewInit() {
    const phone = screenSizes[Device.phone].to;
    tns({
      container: '#' + this.id,
      items: 1,
      mouseDrag: true,
      speed: 400,
      nav: false,
      // arrowKeys: false,
      controls: false,
      responsive: {
        640: {
          items: 3
        }
      }
      // navContainer: false,
      // controlsContainer: false,
    });
  }
}

import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {tns} from 'tiny-slider/src/tiny-slider';
import {Device, MediaQueryService, screenSizes} from '../../../core/services/media-query.service';

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
  public isMobile = this.mediaQueryService.isPhone();

  constructor(
    protected mediaQueryService: MediaQueryService,
  ) {
    count++;
  }

  ngOnInit() {
    console.log('tns=>', this.videoList.length, this.videoList);
  }

  ngAfterViewInit() {
    const phone = screenSizes[Device.phone].to;
    tns({
      container: '#' + this.id,
      items: 1,
      mouseDrag: true,
      loop: false,
      speed: 400,
      nav: false,
      controls: false,
      responsive: {
        [phone]: {
          items: 3
        }
      }
    });
  }
}

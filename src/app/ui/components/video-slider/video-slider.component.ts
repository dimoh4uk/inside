import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { tns } from 'tiny-slider/src/tiny-slider';
import { Device, MediaQueryService, screenSizes } from '../../../core/services/media-query.service';

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
  @Output() public loaded = new EventEmitter();
  protected loadItemCount = 0;
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

  loadOne() {
    this.loadItemCount++;
    if (this.loadItemCount === this.videoList.length) {
      this.loaded.emit();
    }
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

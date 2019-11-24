import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { tns } from 'tiny-slider/src/tiny-slider';


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
    tns({
      container: '#' + this.id,
      items: 3,
      mouseDrag: true,
      speed: 400,
      nav: false,
      // arrowKeys: false,
      controls: false,
      // navContainer: false,
      // controlsContainer: false,
    });
  }

}

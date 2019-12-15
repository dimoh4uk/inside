import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Device, MediaQueryService, screenSizes } from '../../../core/services/media-query.service';
import { tns } from 'tiny-slider/src/tiny-slider';

let count = 0;

@Component({
  selector: 'app-gif-slider',
  templateUrl: './gif-slider.component.html',
  styleUrls: ['./gif-slider.component.scss']
})
export class GifSliderComponent implements OnInit, AfterViewInit {

  @Input() public gitList = [];
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
    // this.loaded.emit();
  }

  loadOne() {
    this.loadItemCount++;
    if (this.loadItemCount === this.gitList.length) {
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

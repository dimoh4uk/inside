import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SiteSateService } from '../core/services/site-sate.service';
import { AppRoutersPath } from '../app-routers.path';
import { fadeIn } from '../core/animation';
import { Options } from '@vimeo/player';

@Component({
  selector: 'app-preloader',
  templateUrl: './preloader.component.html',
  styleUrls: ['./preloader.component.scss'],
  animations: [
    fadeIn,
  ]
})
export class PreloaderComponent implements OnInit {
  public preloaderVideo: Options = {
    autoplay: true,
    id: 359049695,
  };

  constructor(
    protected router: Router,
    protected siteSateService: SiteSateService,
  ) {
  }

  ngOnInit() {
    this.siteSateService.load = false;
  }

  navigateToIndex() {
    this.router.navigate(['/' + AppRoutersPath.index]);
  }

  startTimer() {
    setTimeout(() => {
      this.siteSateService.load = true;
      this.navigateToIndex();
    }, 2000);
  }
}

import { Component, HostBinding, OnInit } from '@angular/core';
import { VideoInterface } from '../ui/components/video/video.component';
import { Router } from '@angular/router';
import { SiteSateService } from '../core/services/site-sate.service';
import { AppRoutersPath } from '../app-routers.path';
import { fadeIn } from '../core/animation';

@Component({
  selector: 'app-preloader',
  templateUrl: './preloader.component.html',
  styleUrls: ['./preloader.component.scss'],
  animations: [
    fadeIn,
  ]
})
export class PreloaderComponent implements OnInit {
  public preloaderVideo: VideoInterface = {
    muted: true,
    autoplay: true,
    poster: '',
    url: 'assets/video/preload.mp4',
    title: 'preloader'
  };

  constructor(
    protected router: Router,
    protected siteSateService: SiteSateService,
  ) {
  }

  ngOnInit() {
    setTimeout(() => {
      this.siteSateService.load = true;
      this.navigateToIndex();
    }, 2000);
  }

  navigateToIndex() {
    this.router.navigate(['/' + AppRoutersPath.index]);
  }
}
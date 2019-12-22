import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

export interface VideoInterface {
  title: string;
  poster: string;
  autoplay: boolean;
  muted: boolean;
  url: string;
}

@Component({
  selector: 'app-video-static',
  templateUrl: './video-static.component.html',
  styleUrls: ['./video-static.component.scss']
})
export class VideoStaticComponent implements OnInit {
  @Input() public video: VideoInterface;
  @ViewChild('videoLink', {static: true}) videoLink: ElementRef;
  @Output() public loaded: EventEmitter<void> = new EventEmitter<void>();

  protected videoElement;

  constructor() {
  }

  ngOnInit() {
    this.videoElement = this.videoLink.nativeElement;
    this.initMute();
    setTimeout(() => this.initAutoPlay(), 0);
  }

  public initMute(): void {
    this.videoElement.muted = this.video.muted;
  }

  public initAutoPlay() {
    this.videoElement.autoplay = this.video.autoplay;
  }
}


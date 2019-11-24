import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';

export interface VideoInterface {
  title: string;
  poster: string;
  url: string;
}

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {
  @Input() public video: VideoInterface;
  @ViewChild('videoLink', {static: true}) videoLink: ElementRef;
  protected timer;

  protected videoElement;

  constructor() {
  }

  ngOnInit() {
    this.videoElement = this.videoLink.nativeElement;
    console.log('videoElement', this.videoElement);

    setTimeout(() => this.toggleVideoStatus(), 0);
    this.mute();
  }

  public mute(): void {
    this.videoElement.muted = !this.videoElement.muted;
  }

  public toggleVideoStatus() {
    this.videoElement.autoplay = !this.videoElement.autoplay;
  }

  @HostListener('mouseover')
  mouseover() {
    this.timer = setTimeout(() => this.videoElement.muted = false, 500);
  }

  @HostListener('mouseout')
  mouseout() {
    clearTimeout(this.timer);
    this.videoElement.muted = true;
  }

}

import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

export interface VideoInterface {
  title: string;
  poster: string;
  autoplay: boolean;
  muted: boolean;
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

  protected videoElement;

  constructor() {
  }

  ngOnInit() {
    this.videoElement = this.videoLink.nativeElement;
  }

}

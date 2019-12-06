import { Component, ElementRef, EventEmitter, HostBinding, Input, OnInit, Output, ViewChild } from '@angular/core';
import Player from '@vimeo/player';
import { Options } from 'vimeo__player';

export interface VideoInterface {
  id: number;
  autopause?: boolean;
  autoplay?: boolean;
  background?: boolean;
  byline?: boolean;
  color?: boolean;
  controls?: boolean;
  dnt?: boolean;
  height?: boolean;
}

const defaultVideoConfig = {
  controls: false,
  autoplay: true,
  muted: true,
  responsive: true,
  byline: false,
  loop: true,
  dnt: true,
};

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {
  @Input() public video: Options;

  @Output() public loaded = new EventEmitter();

  protected hostSelector = this.elRef.nativeElement;
  public player: Player;

  constructor(protected elRef: ElementRef) {
  }

  ngOnInit() {
    const config = {...defaultVideoConfig, ...this.video};
    this.player = new Player(this.hostSelector, config);
    this.player.on('loaded', () => this.loaded.emit());
  }

  public getPlayer() {
    return this.player;
  }
}

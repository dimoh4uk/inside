import {
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnInit,
  Output, ViewChild,
} from '@angular/core';
import Player from '@vimeo/player';
import { Options } from 'vimeo__player';
import { MediaQueryService } from '../../../core/services/media-query.service';

const defaultVideoConfig = {
  controls: false,
  autoplay: false,
  speed: false,
  muted: true,
  responsive: true,
  background: false,
  portrait: false,
  byline: false,
  loop: true,
  dnt: true,
  currentTime: 0,
};

export interface VideoInterface extends Options {
  currentTime?: number;
  preview?: string;
}

const videoPlayerUrl = 'https://player.vimeo.com/video';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {
  @Input() public video: VideoInterface;
  @Output() public loaded = new EventEmitter();
  @Input() public playByHover = false;
  @ViewChild('videoContainer', {static: true}) videoContainer: ElementRef;


  protected emited = false;
  protected config: VideoInterface;
  public player: Player;
  public showPreview = true;

  constructor(
    protected mediaQueryService: MediaQueryService,
  ) {
  }

  isMobile() {
    return this.mediaQueryService.isPhone();
  }

  ngOnInit() {
    this.createConfig();
    if (!this.config.preview) {
      // this.emitLoaded();
    }
    this.player = new Player(this.videoContainer.nativeElement, this.config);
    this.player.ready()
      .then(() => this.player.setCurrentTime(this.config.currentTime))
      .then(() => this.play())
      .then(() => this.showPreview = false)
    ;
  }


  public pause(): Promise<any> {
    return this.player.pause();
  }

  public play(): Promise<any> {
    return this.player.play();
  }

  public emitLoaded(): void {
    if (this.emited) {
      return;
    }
    this.emited = true;
    this.loaded.emit();
  }

  public getPlayer() {
    return this.player;
  }

  public createConfig() {
    const config = {...defaultVideoConfig, ...this.video} as VideoInterface;
    // config.url = this.createUrl(config);
    this.config = config;
  }
}

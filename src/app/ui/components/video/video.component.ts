import {
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import Player from '@vimeo/player';
import {Options} from 'vimeo__player';
import {MediaQueryService} from '../../../core/services/media-query.service';

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
  protected timeOut;
  protected playCalled = false;
  protected config: VideoInterface;

  protected hostSelector = this.elRef.nativeElement;
  public player: Player;

  constructor(
    protected elRef: ElementRef,
    protected mediaQueryService: MediaQueryService,
  ) {
  }

  isMobile() {
    return this.mediaQueryService.isPhone();
  }

  ngOnInit() {

    this.createConfig();
    this.player = new Player(this.hostSelector, this.config);
    this.player.setCurrentTime(this.config.currentTime);

    this.player.on('loaded', () => {
      this.loaded.emit();
    });
  }

  @HostListener('mouseover')
  public mouseover() {
    if (!this.playByHover) {
      return;
    }
    this.clearTimeOut();
    this.setTimeOut();
  }

  @HostListener('mouseout')
  public mouseout() {
    if (!this.playByHover) {
      return;
    }

    this.clearTimeOut();

    if (this.playCalled) {
      this.pause();
    }
  }

  public pause(): Promise<any> {
    this.playCalled = false;
    return this.player.pause();
  }

  public play(): Promise<any> {
    this.playCalled = true;
    return this.player.play();
  }


  protected clearTimeOut() {
    clearTimeout(this.timeOut);
  }

  protected setTimeOut() {
    this.timeOut = setTimeout(() => {
      this.play();
    }, 300);
  }

  public getPlayer() {
    return this.player;
  }

  public createConfig() {
    const config = {...defaultVideoConfig, ...this.video} as VideoInterface;
    // config.url = this.createUrl(config);
    this.config = config;
  }

  protected createUrl(config: VideoInterface): string {
    let url = `${videoPlayerUrl}/${config.id}`;

    if (config.currentTime) {
      url = `${url}#t=${config.currentTime}`;
    }
    return url;
  }

}

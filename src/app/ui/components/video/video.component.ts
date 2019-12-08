import {
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import Player from '@vimeo/player';
import {Options} from 'vimeo__player';

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
};

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {
  @Input() public video: Options;
  @Output() public loaded = new EventEmitter();
  @Input() public playByHover = false;

  protected hostSelector = this.elRef.nativeElement;
  public player: Player;

  constructor(protected elRef: ElementRef) {
  }

  ngOnInit() {
    const config = {...defaultVideoConfig, ...this.video};
    this.player = new Player(this.hostSelector, config);
    this.player.on('loaded', () => this.loaded.emit());
  }

  @HostListener('mouseover')
  public mouseover() {
    if (this.playByHover) {

      this.player.play();
    }
  }

  @HostListener('mouseout')
  public mouseout() {
    if (this.playByHover) {
      this.player.pause();
    }
  }

  public getPlayer() {
    return this.player;
  }
}

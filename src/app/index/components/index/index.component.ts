import { AfterViewInit, Component, ContentChild, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutersPath } from '../../../app-routers.path';
import { RoutersPath } from '../../index.path';
import { SiteSateService } from '../../../core/services/site-sate.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { HeaderButtonComponent } from '../../../ui/components/header-button/header-button.component';

enum TriggerName {
  pageTitle = 'pageTitleTrigger',
}

enum StateName {
  stop = 'hidden',
  start = 'show',
}

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  animations: [
    trigger(TriggerName.pageTitle, [
      state(StateName.stop, style({
        paddingLeft: '0px',
      })),
      state(StateName.start, style({
        paddingLeft: '92px',
      })),
      transition(`${StateName.stop}<=>${StateName.start}`, [
        animate('0.7s')
      ]),
    ]),
  ]


})
export class IndexComponent implements OnInit, AfterViewInit {
  @ViewChild('bgVideo', {static: true}) video: ElementRef;
  @ViewChild(HeaderButtonComponent, {static: false, read: ElementRef}) headerButton: ElementRef;

  constructor(
    protected router: Router,
    protected siteSateService: SiteSateService,
  ) {
  }

  ngOnInit() {
    this.toggleVideoStatus();
    this.mute();
    setInterval(() => this.siteSateService.startHeaderAnimaton(), 1000);
  }

  ngAfterViewInit() {
    this.headerButton.nativeElement.focus();
  }


  public mute(): void {
    this.videoElement.muted = !this.videoElement.muted;
  }

  public toggleVideoStatus() {
    this.videoElement.autoplay = !this.videoElement.autoplay;
  }

  public play($event) {
    if ($event && $event.key !== 'Enter') {
      return;
    }
    this.siteSateService.play();
    this.router.navigate([AppRoutersPath.index, RoutersPath.play]);
  }

  protected get videoElement(): HTMLVideoElement {
    return this.video.nativeElement;
  }

  public getTriggerStatus(): StateName {
    return this.siteSateService.headerAnimationStart ? StateName.start : StateName.stop;
  }
}

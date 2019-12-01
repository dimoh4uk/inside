import { AfterViewInit, Component, ElementRef, HostBinding, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SiteSateService } from '../../../core/services/site-sate.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { HeaderButtonComponent } from '../../../ui/components/header-button/header-button.component';
import { ProjectInterface, ProjectsService } from '../../services/pojects/projects.service';
import { HttpResponse } from '@angular/common/http';
import { MediaQueryService } from '../../../core/services/media-query.service';
import { fadeIn, fadeOut } from '../../../core/animation';

enum TriggerName {
  pageTitle = 'pageTitleTrigger',
  pageTitleHidden = 'pageTitleHidden',
  backEnabled = 'backEnabledTrigger',
}

enum StateName {
  stop = 'stop',
  start = 'start',
  show = 'show',
  hide = 'hide',
  active = 'active',
  disabled = 'disabled',
}

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  animations: [
    fadeIn,
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
    trigger(TriggerName.pageTitleHidden, [
      state(StateName.hide, style({
        left: '0',
      })),
      state(StateName.show, style({
        left: '100%',
      })),
      transition(`${StateName.show}<=>${StateName.hide}`, [
        animate('500ms')
      ]),
    ]),
    trigger(TriggerName.backEnabled, [
      state(StateName.active, style({
        paddingRight: '100px',
      })),
      state(StateName.disabled, style({
        paddingRight: 0,
      })),
      transition(`${StateName.active}<=>${StateName.disabled}`, [
        animate('0.7s')
      ]),
    ])
  ]


})
export class IndexComponent implements OnInit, AfterViewInit {
  @HostBinding('@fadeIn') public fadeIn;
  @ViewChild('bgVideo', {static: true}) video: ElementRef;
  @ViewChild(HeaderButtonComponent, {static: false, read: ElementRef}) headerButton: ElementRef;

  public projects: Array<ProjectInterface>;
  public pageTitle = 'YYYY 2018';
  public fullPageConfig: any;
  public fullpageApi: any;

  constructor(
    protected router: Router,
    protected siteSateService: SiteSateService,
    protected projectsService: ProjectsService,
    protected mediaQueryService: MediaQueryService,
  ) {

    this.fullPageConfig = {

      // fullpage options
      // licenseKey: 'YOUR LICENSE KEY HERE',
      anchors: ['firstPage', 'secondPage', 'thirdPage'],
      parallax: true,
      parallaxOptions: {type: 'reveal', percentage: 62, property: 'translate'},
      // fullpage callbacks
      afterResize: () => {
        console.log('After resize');
      },
      afterLoad: (origin, destination, direction) => {
        console.log('afterLoad');
      }
    };
  }

  isPlayed() {
    return this.siteSateService.isPlayed();
  }

  getRef(fullPageRef) {
    this.fullpageApi = fullPageRef;
  }

  ngOnInit() {
    this.toggleVideoStatus();
    this.mute();
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

  public play($event?) {
    if ($event && $event.key !== 'Enter') {
      return;
    }

    if (!this.siteSateService.headerAnimationStart) {
      this.siteSateService.startHeaderAnimation();
    }

    if (this.isPlayed()) {
      return;
    }

    this.siteSateService.play = true;
    this.loadProjects();
  }

  protected loadProjects() {
    this.projectsService.getProjects().subscribe((response: HttpResponse<Array<ProjectInterface>>) => {
      this.projects = response.body;
      setTimeout(() => {
        this.fullpageApi.build();
      }, 0);
    });
  }

  protected get videoElement(): HTMLVideoElement {
    return this.video.nativeElement;
  }

  get headerAnimationStart(): boolean {
    return this.siteSateService.headerAnimationStart;
  }

  public getTriggerStatus(triggerName: any): StateName {
    if (TriggerName.backEnabled === triggerName) {
      return this.headerAnimationStart ? StateName.active : StateName.disabled;
    }

    if (!this.mediaQueryService.isPhone() && (TriggerName.pageTitle === triggerName)) {
      return this.headerAnimationStart ? StateName.start : StateName.stop;
    }

    if (this.mediaQueryService.isPhone() && (TriggerName.pageTitleHidden === triggerName)) {
      return this.headerAnimationStart ? StateName.show : StateName.hide;
    }


  }

  public back(): void {
    this.siteSateService.stopHeaderAnimation();
  }

}

import {AfterViewInit, Component, ElementRef, HostBinding, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {SiteSateService} from '../../../core/services/site-sate.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {HeaderButtonComponent} from '../../../ui/components/header-button/header-button.component';
import {ProjectInterface, ProjectsService} from '../../services/pojects/projects.service';
import {HttpResponse} from '@angular/common/http';
import {MediaQueryService} from '../../../core/services/media-query.service';
import {fadeIn, fadeOut} from '../../../core/animation';

enum TriggerName {
  pageTitle = 'pageTitleTrigger',
  pageTitleHidden = 'pageTitleHidden',
  backEnabled = 'backEnabledTrigger',
  previewSection = 'previewSection',
}

enum StateName {
  stop = 'stop',
  start = 'start',
  show = 'show',
  hide = 'hide',
  active = 'active',
  disabled = 'disabled',
  mobileActive = 'mobileActive',
  mobileDisabled = 'mobileDisabled',
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
        animate('0.7s ease')
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
        animate('500ms ease')
      ]),
    ]),
    trigger(TriggerName.backEnabled, [
      state(StateName.active, style({
        paddingRight: '100px',
      })),
      state(StateName.disabled, style({
        paddingRight: 0,
      })),
      state(StateName.mobileActive, style({
        bottom: '0',
        left: '0',
      })),
      state(StateName.mobileDisabled, style({
        bottom: '-50px',
        left: '-50px',
      })),
      transition(`${StateName.active}<=>${StateName.disabled}`, [
        animate('0.7s ease')
      ]),
      transition(`${StateName.mobileActive}<=>${StateName.mobileDisabled}`, [
        animate('0.7s ease')
      ]),
    ]),
    trigger(TriggerName.previewSection, [
      state(StateName.show, style({
        position: 'absolute',
        left: '0',
        top: '-10vh',
        right: '0',
      })),
      state(StateName.hide, style({
        position: '*',
        left: '*',
        right: '*',
        top: '0',
        marginTop: '0'
      })),
      transition(`${StateName.hide} <=> ${StateName.show}`, [
        animate('1s ease')
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

  protected projectsLoaded: boolean;
  protected currentSection = null;


  constructor(
    protected router: Router,
    protected siteSateService: SiteSateService,
    protected projectsService: ProjectsService,
    protected mediaQueryService: MediaQueryService,
  ) {

    this.fullPageConfig = {

      // fullpage options
      // licenseKey: 'YOUR LICENSE KEY HERE',
      parallax: true,
      css3: false,
      parallaxOptions: {type: 'reveal', percentage: 62, property: 'translate'},
      // fullpage callbacks
      afterResize: () => {
        console.log('After resize');
      },
      onLeave: (origin, destination) => {
        this.currentSection = null;
      },
      afterLoad: (origin, destination) => {
        setTimeout(() => {
          console.log('afterLoad');
          // tslint:disable-next-line:radix
          this.currentSection = parseInt(destination.item.dataset.sectionId) || 0;
          if (this.currentSection === 0) {
            this.videoElement.play();
          }
        }, 300);
      }
    };
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
    } else {
      return;
    }

    this.loadProjects();
  }

  protected loadProjects() {
    this.projectsService
      .getProjects()
      .toPromise()
      .then((response: any) => {
        const resp = response.body;
        resp.forEach((project) => {
          project.videos.forEach((video) => {
            video.muted = false;
            return video;
          });
        });
        return resp;
      })
      .then((response: any) => {
        this.projects = response;
        setTimeout(() => {
          this.fullpageApi.build();
          this.projectsLoaded = true;
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
      if (!this.mediaQueryService.isPhone()) {
        return this.headerAnimationStart ? StateName.active : StateName.disabled;
      } else {
        return this.headerAnimationStart ? StateName.mobileActive : StateName.mobileDisabled;
      }
    }

    if (!this.mediaQueryService.isPhone() && (TriggerName.pageTitle === triggerName)) {
      return this.headerAnimationStart ? StateName.start : StateName.stop;
    }

    if (this.mediaQueryService.isPhone() && (TriggerName.pageTitleHidden === triggerName)) {
      return this.headerAnimationStart ? StateName.show : StateName.hide;
    }
  }

  public getPreviewTriggerStatus(section) {
    const isInitial = this.currentSection === null;
    if (!this.headerAnimationStart || !this.projectsLoaded || isInitial) {
      return StateName.hide;
    }

    // tslint:disable-next-line:radix
    const sectionId = parseInt(section.dataset.sectionId);
    const nextSection = this.currentSection + 1;
    const currentIsNext = sectionId === nextSection;
    return currentIsNext ? StateName.show : StateName.hide;
  }

  public back(): void {
    this.projects = undefined;
    this.projectsLoaded = false;
    this.siteSateService.stopHeaderAnimation();
  }

}

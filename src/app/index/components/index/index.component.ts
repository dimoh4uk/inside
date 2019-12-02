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
  previewSection = 'previewSection',
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
      transition(`${StateName.active}<=>${StateName.disabled}`, [
        animate('0.7s ease')
      ]),
    ]),
    trigger(TriggerName.previewSection, [
      state(StateName.show, style({
        position: 'absolute',
        left: '0',
        top: '0',
        right: '0',
        marginTop: '-9vh'
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
        this.projects = response.body;
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
      return this.headerAnimationStart ? StateName.active : StateName.disabled;
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

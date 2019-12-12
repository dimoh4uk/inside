import { AfterViewInit, Component, ElementRef, HostBinding, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SiteSateService } from '../../../core/services/site-sate.service';
import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { HeaderButtonComponent } from '../../../ui/components/header-button/header-button.component';
import { ProjectInterface, ProjectsService } from '../../services/pojects/projects.service';
import { MediaQueryService } from '../../../core/services/media-query.service';
import { fadeIn } from '../../../core/animation';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  animations: [
    fadeIn,
    trigger('pageTitleTrigger', [
      state('stop', style({
        paddingLeft: '0px',
      })),
      state('start', style({
        paddingLeft: '92px',
      })),
      transition(`stop <=> start`, [
        animate('0.7s ease')
      ]),
    ]),
    trigger('pageTitleHidden', [
      state('hide', style({
        left: '0',
      })),
      state('show', style({
        left: '100%',
      })),
      transition(`show <=> hide`, [
        animate('500ms ease')
      ]),
    ]),
    trigger('backEnabledTrigger', [
      state('active', style({
        paddingRight: '100px',
      })),
      state('', style({
        paddingRight: 0,
      })),
      state('mobileActive', style({
        bottom: '0',
        left: '0',
      })),
      state('mobileDisabled', style({
        bottom: '-50px',
        left: '-50px',
      })),
      transition(`active <=> disabled`, [
        animate('0.7s ease')
      ]),
      transition(`mobileActive <=> mobileDisabled`, [
        animate('0.7s ease')
      ]),
    ]),
    trigger('previewSection', [
      state('show', style({
        position: 'absolute',
        left: '0',
        top: '-90px',
        right: '0',
      })),
      state('hide', style({
        position: '*',
        left: '0',
        right: '0',
        top: '0',
      })),
      transition(`hide <=> show`, [
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

  protected loadedSliders = 0;
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
        const section = this.getSectionId(destination.item);
        if (section === 0) {
          this.videoElement.play();
        }
        this.currentSection = null;
      },
      afterLoad: (origin, destination) => {
        this.currentSection = this.getSectionId(destination.item);
      }
    };
  }

  getSectionId(section): number {
    // tslint:disable-next-line:radix
    return parseInt(section.dataset.sectionId) || 0;
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
            video.muted = true;
            if (!this.mediaQueryService.isPhone()) {
              video.autoplay = true;
            }
            return video;
          });
        });
        return resp;
      })
      .then((response: any) => {
        this.projects = response;
        setTimeout(() => this.fullpageApi.build(), 0);
      });
  }

  protected get videoElement(): HTMLVideoElement {
    return this.video.nativeElement;
  }

  get headerAnimationStart(): boolean {
    return this.siteSateService.headerAnimationStart;
  }

  public getTriggerStatus(triggerName: any): string {
    if ('backEnabledTrigger' === triggerName) {
      if (!this.mediaQueryService.isPhone()) {
        return this.headerAnimationStart ? 'active' : 'disabled';
      } else {
        return this.headerAnimationStart ? 'mobileActive' : 'mobileDisabled';
      }
    }

    if (!this.mediaQueryService.isPhone() && ('pageTitleTrigger' === triggerName)) {
      return this.headerAnimationStart ? 'start' : 'stop';
    }

    if (this.mediaQueryService.isPhone() && ('pageTitleHidden' === triggerName)) {
      return this.headerAnimationStart ? 'show' : 'hide';
    }
  }

  public getPreviewTriggerStatus(section) {
    const isInitial = this.currentSection === null;
    if (!this.headerAnimationStart || !this.projectsLoaded || isInitial) {
      return 'hide';
    }

    // tslint:disable-next-line:radix
    const sectionId = parseInt(section.dataset.sectionId);
    const nextSection = this.currentSection + 1;
    const currentIsNext = sectionId === nextSection;

    return currentIsNext ? 'show' : 'hide';
  }

  public back(): void {
    this.fullpageApi.moveTo(1);
    setTimeout(() => {
      this.projects = undefined;
      this.projectsLoaded = false;
      this.loadedSliders = 0;
      this.siteSateService.stopHeaderAnimation();
    }, 500);
  }

  public loadedSlider() {
    this.loadedSliders++;
    if (this.projects && (this.loadedSliders === this.projects.length)) {
      this.projectsLoaded = true;
    }
  }
}

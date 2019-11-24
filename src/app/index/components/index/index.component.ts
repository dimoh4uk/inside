import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SiteSateService } from '../../../core/services/site-sate.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { HeaderButtonComponent } from '../../../ui/components/header-button/header-button.component';
import { ProjectInterface, ProjectsService } from '../../services/pojects/projects.service';
import { HttpResponse } from '@angular/common/http';

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
  public projects: Array<ProjectInterface>;

  config: any;
  fullpageApi: any;


  constructor(
    protected router: Router,
    protected siteSateService: SiteSateService,
    protected projectsService: ProjectsService,
  ) {

    this.config = {

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
        console.log(origin, destination, direction);
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

    setInterval(() => this.siteSateService.startHeaderAnimaton(), 1500);
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
    if (this.isPlayed()) {
      return;
    }
    if ($event && $event.key !== 'Enter') {
      return;
    }
    this.siteSateService.play();

    this.projectsService.getProjects().subscribe((response: HttpResponse<Array<ProjectInterface>>) => {
      this.projects = response.body;
      setTimeout(() => {
        this.fullpageApi.build();
        this.fullpageApi.moveTo(2);

      }, 0);
    });
  }

  protected get videoElement(): HTMLVideoElement {
    return this.video.nativeElement;
  }

  public getTriggerStatus(): StateName {
    return this.siteSateService.headerAnimationStart ? StateName.start : StateName.stop;
  }

}

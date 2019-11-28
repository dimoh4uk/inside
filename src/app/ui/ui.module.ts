import { NgModule } from '@angular/core';
import { SiteSectionComponent } from './components/site-section/site-section.component';
import { SharedModule } from '../shared/shared.module';
import { HeaderButtonComponent } from './components/header-button/header-button.component';
import { VideoComponent } from './components/video/video.component';
import { VideoSliderComponent } from './components/video-slider/video-slider.component';


@NgModule({
  declarations: [
    SiteSectionComponent,
    HeaderButtonComponent,
    VideoComponent,
    VideoSliderComponent,
  ],
  exports: [
    SiteSectionComponent,
    HeaderButtonComponent,
    VideoComponent,
    VideoSliderComponent,
    SharedModule,
  ],
  imports: [
    SharedModule
  ]
})
export class UiModule {
}

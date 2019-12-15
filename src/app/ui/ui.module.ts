import {NgModule} from '@angular/core';
import {SiteSectionComponent} from './components/site-section/site-section.component';
import {SharedModule} from '../shared/shared.module';
import {HeaderButtonComponent} from './components/header-button/header-button.component';
import {VideoComponent} from './components/video/video.component';
import {VideoSliderComponent} from './components/video-slider/video-slider.component';
import {VideoStaticComponent} from './components/video-static/video-static.component';
import { GifSliderComponent } from './components/gif-slider/gif-slider.component';


@NgModule({
  declarations: [
    SiteSectionComponent,
    HeaderButtonComponent,
    VideoComponent,
    VideoSliderComponent,
    VideoStaticComponent,
    GifSliderComponent,
  ],
  exports: [
    SiteSectionComponent,
    HeaderButtonComponent,
    VideoComponent,
    VideoSliderComponent,
    SharedModule,
    VideoStaticComponent,
    GifSliderComponent,
  ],
  imports: [
    SharedModule
  ]
})
export class UiModule {
}

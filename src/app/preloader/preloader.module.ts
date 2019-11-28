import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PreloaderRoutingModule } from './preloader-routing.module';
import { PreloaderComponent } from './preloader.component';
import { UiModule } from '../ui/ui.module';


@NgModule({
  declarations: [PreloaderComponent],
  imports: [
    CommonModule,
    UiModule,
    PreloaderRoutingModule
  ]
})
export class PreloaderModule {
}

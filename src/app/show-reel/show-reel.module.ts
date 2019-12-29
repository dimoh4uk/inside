import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowReelRoutingModule } from './show-reel-routing.module';
import { ShowReelComponent } from './show-reel/show-reel.component';


@NgModule({
  declarations: [ShowReelComponent],
  imports: [
    CommonModule,
    ShowReelRoutingModule
  ]
})
export class ShowReelModule {
}

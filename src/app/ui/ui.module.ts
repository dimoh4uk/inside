import { NgModule } from '@angular/core';
import { SiteSectionComponent } from './components/site-section/site-section.component';
import { SharedModule } from '../shared/shared.module';
import { HeaderButtonComponent } from './components/header-button/header-button.component';


@NgModule({
  declarations: [
    SiteSectionComponent,
    HeaderButtonComponent,
  ],
  exports: [
    HeaderButtonComponent
  ],
  imports: [
    SharedModule
  ]
})
export class UiModule {
}

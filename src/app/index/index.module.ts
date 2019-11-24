import { NgModule } from '@angular/core';

import { IndexRoutingModule } from './index-routing.module';
import { IndexComponent } from './components/index/index.component';
import { SharedModule } from '../shared/shared.module';
import { UiModule } from '../ui/ui.module';
import { ProjectsService } from './services/pojects/projects.service';
import { AngularFullpageModule } from '@fullpage/angular-fullpage';


@NgModule({
  declarations: [
    IndexComponent,
  ],
  providers: [
    ProjectsService,
  ],
  imports: [
    SharedModule,
    IndexRoutingModule,
    UiModule,
    AngularFullpageModule,
  ]
})
export class IndexModule {
}

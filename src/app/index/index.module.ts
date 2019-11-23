import { NgModule } from '@angular/core';

import { IndexRoutingModule } from './index-routing.module';
import { IndexComponent } from './components/index/index.component';
import { SharedModule } from '../shared/shared.module';
import { CategoriesComponent } from './components/categories/categories.component';
import { UiModule } from '../ui/ui.module';


@NgModule({
  declarations: [
    IndexComponent,
    CategoriesComponent,
  ],
  imports: [
    SharedModule,
    IndexRoutingModule,
    UiModule,
  ]
})
export class IndexModule {
}

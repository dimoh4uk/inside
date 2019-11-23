import { NgModule } from '@angular/core';
import { ErrorsRoutingModule } from './errors-routing.module';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    NotFoundComponent
  ],
  imports: [
    SharedModule,
    ErrorsRoutingModule
  ]
})
export class ErrorsModule {
}

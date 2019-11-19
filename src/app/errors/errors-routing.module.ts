import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoutersPath } from './routers.path';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: RoutersPath.notFound
  },
  {
    path: RoutersPath.notFound,
    component: NotFoundComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErrorsRoutingModule {
}

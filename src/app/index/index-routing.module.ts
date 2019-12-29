import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './components/index/index.component';
import { LoadedGuard } from '../core/services/loaded-guard.service';
import { AppRoutersPath } from '../app-routers.path';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    canActivate: [LoadedGuard],
    data: {
      animation: AppRoutersPath.index,
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndexRoutingModule {
}

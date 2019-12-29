import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShowReelComponent } from './show-reel/show-reel.component';


const routes: Routes = [
  {
    path: '',
    component: ShowReelComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShowReelRoutingModule { }

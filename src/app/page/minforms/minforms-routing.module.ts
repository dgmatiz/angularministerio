import {NgModule} from '@angular/core';
import {MinformsComponent} from './minforms.component';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: MinformsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MinformsRoutingModule {
}

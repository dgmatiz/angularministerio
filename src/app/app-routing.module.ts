import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Route, RouterModule} from '@angular/router';

const routers: Route[] = [
  {
    path: 'forms',
    loadChildren: () => import('./page/minforms/minforms.module').then(m => m.MinformsModule),
    data: { preload : true }
  },
  {
    path: '',
    redirectTo: '/forms',
    pathMatch: 'full'
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routers, {
      enableTracing: false
    })
  ],
})

export class AppRoutingModule {
}

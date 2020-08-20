import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MinformsComponent} from './minforms.component';
import {MinformsRoutingModule} from './minforms-routing.module';
import {ButtonModule, DropdownModule, ListboxModule, PanelModule, TableModule} from 'primeng';
import {FormsModule} from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';


@NgModule({
  declarations: [
    MinformsComponent
  ],
  exports: [
    MinformsComponent
  ],
  imports: [
    CommonModule,
    MinformsRoutingModule,
    ListboxModule,
    FormsModule,
    DropdownModule,
    PanelModule,
    InputTextModule,
    ButtonModule,
    TableModule
  ]
})
export class MinformsModule {
}

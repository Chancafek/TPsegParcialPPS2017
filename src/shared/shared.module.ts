import { CapitalizePipe } from './pipes/capitalize/capitalize';
import { FirstPipe } from './pipes/first/first';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
@NgModule({
  declarations: [
    FirstPipe,
    CapitalizePipe
  ],
  imports: [],
  exports: [
    FirstPipe,
    CapitalizePipe
  ]
})
export class SharedModule {}

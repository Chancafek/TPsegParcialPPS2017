import { FirstWordPipe } from './pipes/firstword/firstword';
import { CapitalizePipe } from './pipes/capitalize/capitalize';
import { FirstPipe } from './pipes/first/first';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
@NgModule({
  declarations: [
    FirstPipe,
    CapitalizePipe,
    FirstWordPipe
  ],
  imports: [],
  exports: [
    FirstPipe,
    CapitalizePipe,
    FirstWordPipe
  ]
})
export class SharedModule {}

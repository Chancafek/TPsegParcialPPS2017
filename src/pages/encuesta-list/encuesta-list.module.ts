import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EncuestaListPage } from './encuesta-list';

@NgModule({
  declarations: [
    EncuestaListPage,
  ],
  imports: [
    IonicPageModule.forChild(EncuestaListPage),
  ],
  exports: [
    EncuestaListPage
  ]
})
export class EncuestaListPageModule {}

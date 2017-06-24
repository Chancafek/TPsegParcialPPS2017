import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EncuestaFormPage } from './encuesta-form';

@NgModule({
  declarations: [
    EncuestaFormPage,
  ],
  imports: [
    IonicPageModule.forChild(EncuestaFormPage),
  ],
  exports: [
    EncuestaFormPage
  ]
})
export class EncuestaFormPageModule {}

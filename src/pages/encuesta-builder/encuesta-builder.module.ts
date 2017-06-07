import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EncuestaBuilderPage } from './encuesta-builder';

@NgModule({
  declarations: [
    EncuestaBuilderPage,
  ],
  imports: [
    IonicPageModule.forChild(EncuestaBuilderPage),
  ],
  exports: [
    EncuestaBuilderPage
  ]
})
export class EncuestaBuilderPageModule {}

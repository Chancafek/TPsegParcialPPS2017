import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PreguntaBuilderPage } from './pregunta-builder';

@NgModule({
  declarations: [
    PreguntaBuilderPage,
  ],
  imports: [
    IonicPageModule.forChild(PreguntaBuilderPage),
  ],
  exports: [
    PreguntaBuilderPage
  ]
})
export class PreguntaBuilderPageModule {}

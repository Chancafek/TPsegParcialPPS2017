import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PreguntaBuilderPage } from './pregunta-builder';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    PreguntaBuilderPage,
  ],
  imports: [
    IonicPageModule.forChild(PreguntaBuilderPage),
    TranslateModule.forChild()
  ],
  exports: [
    PreguntaBuilderPage
  ]
})
export class PreguntaBuilderPageModule {}

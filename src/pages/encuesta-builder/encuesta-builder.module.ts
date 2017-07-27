import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EncuestaBuilderPage } from './encuesta-builder';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    EncuestaBuilderPage
  ],
  imports: [
    IonicPageModule.forChild(EncuestaBuilderPage),
    TranslateModule.forChild()
  ],
  exports: [
    EncuestaBuilderPage
  ]
})
export class EncuestaBuilderPageModule {}

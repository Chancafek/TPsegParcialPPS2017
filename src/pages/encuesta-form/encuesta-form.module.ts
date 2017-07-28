import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EncuestaFormPage } from './encuesta-form';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    EncuestaFormPage,
  ],
  imports: [
    IonicPageModule.forChild(EncuestaFormPage),
    TranslateModule.forChild()
  ],
  exports: [
    EncuestaFormPage
  ]
})
export class EncuestaFormPageModule {}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EncuestaListPage } from './encuesta-list';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    EncuestaListPage,
  ],
  imports: [
    IonicPageModule.forChild(EncuestaListPage),
    TranslateModule.forChild()
  ],
  exports: [
    EncuestaListPage
  ]
})
export class EncuestaListPageModule {}

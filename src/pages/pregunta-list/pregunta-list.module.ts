import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PreguntaListPage } from './pregunta-list';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    PreguntaListPage,
  ],
  imports: [
    IonicPageModule.forChild(PreguntaListPage),
    TranslateModule.forChild()
  ],
  exports: [
    PreguntaListPage
  ]
})
export class PreguntaListPageModule {}

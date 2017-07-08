import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PreguntaListPage } from './pregunta-list';

@NgModule({
  declarations: [
    PreguntaListPage,
  ],
  imports: [
    IonicPageModule.forChild(PreguntaListPage),
  ],
  exports: [
    PreguntaListPage
  ]
})
export class PreguntaListPageModule {}

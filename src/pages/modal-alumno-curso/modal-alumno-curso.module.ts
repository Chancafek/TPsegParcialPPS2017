import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalAlumnoCursoPage } from './modal-alumno-curso';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ModalAlumnoCursoPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalAlumnoCursoPage),
    TranslateModule.forChild()
  ],
  exports: [
    ModalAlumnoCursoPage
  ]
})
export class ModalAlumnoCursoPageModule {}

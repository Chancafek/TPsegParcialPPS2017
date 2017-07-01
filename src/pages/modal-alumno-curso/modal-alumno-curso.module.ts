import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalAlumnoCursoPage } from './modal-alumno-curso';

@NgModule({
  declarations: [
    ModalAlumnoCursoPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalAlumnoCursoPage),
  ],
  exports: [
    ModalAlumnoCursoPage
  ]
})
export class ModalAlumnoCursoPageModule {}

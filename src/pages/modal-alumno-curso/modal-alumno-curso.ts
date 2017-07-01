import { CursosProvider } from './../../providers/cursos/cursos';
import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController, ToastController } from 'ionic-angular';

/**
 * Generated class for the ModalAlumnoCursoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-modal-alumno-curso',
  templateUrl: 'modal-alumno-curso.html',
})
export class ModalAlumnoCursoPage {

  cursos: any;
  alumno_id: any;
  cursosInscritos: any;

  constructor(
    public navParams: NavParams,
    private viewCtrl: ViewController,
    private cursoProvider: CursosProvider,
    private toastCtrl: ToastController
    ) {
  }

  ionViewWillLoad() {
    this.alumno_id = this.navParams.get('data');
    console.log(this.alumno_id);
    this.cursoProvider.listarCursos()
      .subscribe(
        data => this.cursos = data
      );
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  inscribirAlumno() {
    this.cursoProvider.inscribirCurso(this.alumno_id, this.cursosInscritos)
      .subscribe(
        data => {
          let toast = this.toastCtrl.create({
            message: data.message,
            duration: 2000
          });
          toast.present();
        }
      );
  }

}

import { CursosProvider } from './../../providers/cursos/cursos';
import { UserProvider } from './../../providers/user/user';
import { IdentityProvider } from './../../providers/identifier/identifier';
import { User } from './../../models/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, ToastController, ModalController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

/**
 * Generated class for the ListUserPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-list-user',
  templateUrl: 'list-user.html',
})
export class ListUserPage {

  currentUser: User;
  alumnos: User[];
  profesores: User[];
  administrativos: User[];
  selectedGroup: User[];
  currentRol: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private identifier: IdentityProvider,
    private userProvider: UserProvider,
    private actionSheetCtrl: ActionSheetController,
    private toastCtrl: ToastController,
    private cursoProvider: CursosProvider,
    private modalCtrl: ModalController,
    private translate: TranslateService
    ) {
      this.currentRol = 3;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListUserPage');
    this.identifier.getUserProfile()
      .subscribe(
        data => {
          this.currentUser = data;
          this.obtener();
        },
        e => console.log(e)
      );

  }

  ionViewDidEnter() {

  }

  obtener() {
    if (this.currentUser.rol_id == 4) {
      this.obtenerAlumnos();
      this.obtenerProfesores();
    }
    if (this.currentUser.rol_id == 1) {
      this.obtenerAlumnos();
      this.obtenerProfesores();
      this.obtenerAdministrativos();
    }
  }

  obtenerAlumnos() {
    this.userProvider.getUserByRol(3)
        .subscribe(
          data => {
            this.alumnos = data;
            this.selectedGroup = this.alumnos;
          },
          err => console.log(err)
        );
  }

  obtenerProfesores() {
    this.userProvider.getUserByRol(2)
        .subscribe(
          data => this.profesores = data,
          err => console.log(err)
        );
  }

  obtenerAdministrativos() {
    this.userProvider.getUserByRol(4)
      .subscribe(
        data => this.administrativos = data,
        err => console.log(err)
      );
  }

  selectedRol() {
    // console.log(this.currentRol);
    this.currentRol = parseInt(this.currentRol);
    switch(this.currentRol) {
      case 2:
        this.selectedGroup = this.profesores;
        // console.log('profesores');
        break;
      case 3:
        this.selectedGroup = this.alumnos;
        // console.log('alms');
        break;
      case 4:
        this.selectedGroup = this.administrativos;
        // console.log('adms');
        break;
    }
  }

  lanzarOpciones(usuario) {
    let bloqueoText = (parseInt(usuario.activo) == 0) ? this.translate.currentLang=="es" ? 'Activar' : "Activate" : this.translate.currentLang=="es" ? 'Bloquear' : "Block";
    if (this.currentRol == 3) {
      let actionSheet = this.actionSheetCtrl.create({
        title: this.translate.currentLang=="es" ? 'Opciones' : "Options",
        cssClass: 'user-options-actionsheet',
        buttons: [
          {
            text: bloqueoText,
            icon: 'md-contacts',
            handler: () => {
              this.userProvider.removeUser(usuario.id)
                .subscribe(
                  data => {
                    let toast = this.toastCtrl.create({
                      message: 'Hecho!',
                      duration: 2000
                    });
                    toast.present();
                    this.obtenerAlumnos();
                  },
                  error => {
                    let toast = this.toastCtrl.create({
                      message: error,
                      duration: 3000
                    });
                    toast.present();
                  }
                )
            }
          },{
            text: this.translate.currentLang=="es" ? 'Inscribir a cursos' : "Enroll to courses",
            icon: 'md-book',
            handler: () => {
              const mdl = this.modalCtrl.create('ModalAlumnoCursoPage', { data: usuario.legajo.legajo });
              mdl.present();
            }
          },{
            text: this.translate.currentLang=="es" ? 'Cancelar' : 'Cancel',
            icon: 'md-redo',
            role: 'cancel',
          }
        ],
        enableBackdropDismiss: true
      });
      actionSheet.present();
    }
  }

  inscribirAlumno(legajo: any) {
    const mdl = this.modalCtrl.create('ModalAlumnoCursoPage', { data: legajo });
    mdl.present();
  }

}

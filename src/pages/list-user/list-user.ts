import { UserProvider } from './../../providers/user/user';
import { IdentityProvider } from './../../providers/identifier/identifier';
import { User } from './../../models/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';

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
    private actionSheetCtrl: ActionSheetController
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
        console.log('profesores');
        break;
      case 3:
        this.selectedGroup = this.alumnos;
        console.log('alms');
        break;
      case 4:
        this.selectedGroup = this.administrativos;
        console.log('adms');
        break;
    }
  }

  lanzarOpciones() {
    if (this.currentRol == 3) {
      let actionSheet = this.actionSheetCtrl.create({
        title: 'Opciones',
        cssClass: 'user-options-actionsheet',
        buttons: [
          {
            text: 'Bloquear',
            icon: 'md-images',
            handler: () => {
              //dar de baja
            }
          },{
            text: 'Asignar Materia',
            icon: 'md-camera',
            handler: () => {
              //asignar materia
            }
          },{
            text: 'Cancel',
            icon: 'md-redo',
            role: 'cancel',
          }
        ],
        enableBackdropDismiss: true
      });
      actionSheet.present();
    }
  }

}

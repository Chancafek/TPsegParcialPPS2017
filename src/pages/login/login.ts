import { AuthProvider } from './../../providers/auth/auth';
import { UserProvider } from './../../providers/user/user';
import { MenuController, ActionSheetController } from 'ionic-angular';
import { User } from './../../models/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user: User;
  loading = false;
  errors: any;
  submitAttempt = false;
  loginForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private menu: MenuController,
    private _userService: UserProvider,
    private _authService: AuthProvider,
    public alertCtrl: AlertController,
    private fb: FormBuilder,
    private loadingCtrl: LoadingController,
    private actionSheetCtrl: ActionSheetController
    ) {
    /*
        Deshabilito el sidemenu,
        para desarrollo lo dejo comentado por si necesitan acceder a otras páginas del menu
    */
    this.user = new User();
    this.loginForm = fb.group({
      'email' : [null, Validators.compose([Validators.required, Validators.email])],
      'password' : [null, Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(12)])]
    });
  }

  ionViewDidEnter() {
    this.menu.enable(false);
    this._authService.logout();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  logForm() {
    this.submitAttempt = true;
    this.loading = true;
    let loader = this.loadingCtrl.create({
      content: "Verificando datos...",
    });
    loader.present();
    if(this.loginForm.valid) {
      this._authService.attempt(this.loginForm.value)
        .subscribe(
          res => {
            this.loading = false;
            loader.dismiss();
            this.presentAlerta('Exito!', 'Te has logueado satisfactoriamente!');
            setTimeout(() => this.navCtrl.setRoot('MenuPage'), 2500);
            this.navCtrl.push('MenuPage');
          },
          error => {
            this.loading = false;
            loader.dismiss();
            this.presentAlerta('Falló!', 'Parece que hubo un error');
            this.errors = error;
            console.log(error);
          }
        );
    }
  }

  presentAlerta(titulo: string, mensaje: string) {
    let toast = this.alertCtrl.create({
      title: titulo,
      subTitle: mensaje,
      buttons: ['OK']
    });
    toast.present();
  }

  goRegistro() {
    this.navCtrl.push('SignupPage');
  }

  test() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Test de Usuarios',
      cssClass: 'profile-img-actionsheet',
      buttons: [
        {
          text: 'Admin',
          icon: 'md-briefcase',
          handler: () => {
            this.loginForm.controls['email'].setValue('admin@slim.com');
            this.loginForm.controls['password'].setValue('121212');
          }
        },{
          text: 'Administrativo',
          icon: 'md-clipboard',
          handler: () => {
            this.loginForm.controls['email'].setValue('administrativo@slim.com');
            this.loginForm.controls['password'].setValue('121212');
          }
        },{
          text: 'Profesor',
          icon: 'md-contact',
          handler: () => {
            this.loginForm.controls['email'].setValue('profesor1@slim.com');
            this.loginForm.controls['password'].setValue('121212');
          }
        },
        {
          text: 'Alumno',
          icon: 'md-ionitron',
          handler: () => {
            this.loginForm.controls['email'].setValue('alumno1@slim.com');
            this.loginForm.controls['password'].setValue('121212');
          }
        }
      ],
      enableBackdropDismiss: true
    });
    actionSheet.present();
  }
}

import { AuthProvider } from './../../providers/auth/auth';
import { UserProvider } from './../../providers/user/user';
import { MenuController, ActionSheetController } from 'ionic-angular';
import { User } from './../../models/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { TranslateService } from '@ngx-translate/core';

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
    private actionSheetCtrl: ActionSheetController,
    private translate: TranslateService
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
      content: this.translate.instant('VERIFICANDO_DATOS'),
    });
    loader.present();
    if(this.loginForm.valid) {
      this._authService.attempt(this.loginForm.value)
        .subscribe(
          res => {
            this.loading = false;
            loader.dismiss();
            this.presentAlerta(this.translate.instant('EXITO') , this.translate.instant('EXITO_LOGIN'));
            //setTimeout(() => this.navCtrl.setRoot('MenuPage'), 2500);
            //this.navCtrl.push('MenuPage');
            this.navCtrl.setRoot('MenuPage');
          },
          error => {
            this.loading = false;
            loader.dismiss();
            this.presentAlerta(this.translate.instant('FALLO'), this.translate.instant('OCURRIO_ERROR'));
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
      title: this.translate.instant('TEST_USUARIOS'),
      cssClass: 'profile-img-actionsheet',
      buttons: [
        {
          text: this.translate.instant('ADMIN'),
          icon: 'md-briefcase',
          handler: () => {
            this.loginForm.controls['email'].setValue('admin@slim.com');
            this.loginForm.controls['password'].setValue('121212');
          }
        },{
          text: this.translate.instant('ADMINISTRATIVO'),
          icon: 'md-clipboard',
          handler: () => {
            this.loginForm.controls['email'].setValue('administrativo@slim.com');
            this.loginForm.controls['password'].setValue('121212');
          }
        },{
          text: this.translate.instant('PROFESOR'),
          icon: 'md-contact',
          handler: () => {
            this.loginForm.controls['email'].setValue('profesor1@slim.com');
            this.loginForm.controls['password'].setValue('121212');
          }
        },
        {
          text: this.translate.instant('ALUMNO'),
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

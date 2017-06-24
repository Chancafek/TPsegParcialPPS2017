import { AuthProvider } from './../../providers/auth/auth';
import { UserProvider } from './../../providers/user/user';
import { MenuController } from 'ionic-angular';
import { User } from './../../models/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormGroup, Validators, FormControl } from "@angular/forms";

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
    public toastCtrl: ToastController
    ) {
    /*
        Deshabilito el sidemenu,
        para desarrollo lo dejo comentado por si necesitan acceder a otras páginas del menu
    */
    //this.menu.enable(false);
    this.user = new User();
    this.loginForm = new FormGroup({
      email : new FormControl('', Validators.compose([Validators.required, Validators.email])),
      password : new FormControl('', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(12)]))
    });
  }

  ionViewDidEnter() {
    this._authService.logout();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  logForm() {
    this.submitAttempt = true;
    this.loading = true;
    if(this.loginForm.valid) {
      this._authService.attempt(this.loginForm.value)
        .subscribe(
          res => {
            this.loading = false;
            this.presentToast('Te has logueado satisfactoriamente!');
            setTimeout(() => this.navCtrl.setRoot('HomePage'), 2500);
          },
          error => {
            this.loading = false;
            // this.presentToast(error);
            this.errors = error;
            console.log(error);
          }
        );
    }
  }

  presentToast(mensaje: string) {
    let toast = this.toastCtrl.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }

  goRegistro() {
    this.navCtrl.push('SignupPage');
  }
}

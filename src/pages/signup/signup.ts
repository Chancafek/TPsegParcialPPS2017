import { GeolocalizacionProvider } from './../../providers/geolocalizacion/geolocalizacion';
import { Domicilio } from './../../models/domicilio';
import { UserProvider } from './../../providers/user/user';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';;
import { User } from './../../models/user';
import { MenuController, LoadingController, AlertController } from 'ionic-angular';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

/**
 * Generated class for the SignupPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  user: User;
  submitAttempt = false;
  regForm: FormGroup;
  errors: any;
  oday = new Date().toISOString();
  coords: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private menu: MenuController,
    private fb: FormBuilder,
    private loadingCtrl: LoadingController,
    private _userService: UserProvider,
    private alertCtrl: AlertController,
    private localizador: GeolocalizacionProvider,
    private translate: TranslateService
    ) {
      /*
        Deshabilito el sidemenu,
        para desarrollo lo dejo comentado por si necesitan acceder a otras páginas del menu
      */
    this.user = new User();
    this.user.domicilio = new Domicilio();
    this.regForm = this.fb.group({
      'nombre' : [null, Validators.compose([Validators.required, Validators.minLength(3)])],
      'apellido' : [null, Validators.compose([Validators.required, Validators.minLength(2)])],
      'documento' : [null, Validators.compose([Validators.required, Validators.minLength(7), Validators.pattern('[1-9]+[0-9]*')])],
      'email' : [null, Validators.compose([Validators.required, Validators.email])],
      'password' : [null, Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(12)])],
      'fnacimiento' : [null, Validators.required],
      'sexo' : ['m', Validators.required],
      'direccion' : [null, Validators.compose([Validators.required, Validators.minLength(5)])]
    });
    const gloc = localStorage.getItem('educadroid_coords');
    if(gloc == null) {
      this.localizador.getLocalizacion();
    }

  }

  ionViewWillLoad() {
    this.menu.enable(false);
  }

  setUserData() {

    this.user.nombre = this.regForm.get('nombre').value;
    this.user.apellido =  this.regForm.get('apellido').value;
    this.user.documento = this.regForm.get('documento').value;
    this.user.fnacimiento = this.regForm.get('fnacimiento').value;
    this.user.email = this.regForm.get('email').value;
    this.user.password = this.regForm.get('password').value;
    this.user.sexo = this.regForm.get('sexo').value;
    this.user.domicilio.direccion = this.regForm.get('direccion').value;
    if(this.coords) {
      this.user.domicilio.latitud = this.coords.latitud;
      this.user.domicilio.longitud = this.coords.longitud;
    } else {
      this.user.domicilio.latitud = 0;
      this.user.domicilio.longitud = 0;
    }
  }

  registerForm() {
    this.submitAttempt = true;
    let loader = this.loadingCtrl.create({
      content: this.translate.instant('VERIFICANDO_DATOS'),
    });
    loader.present();
    if(this.regForm.valid) {
      this.setUserData();
      this._userService.addUser(this.user)
        .subscribe(
          res => {
            this.submitAttempt = false;
            loader.dismiss();
            this.presentAlerta(this.translate.instant('EXITO') , this.translate.instant('REGISTRADO_EXITO'));
            setTimeout(() => this.navCtrl.setRoot('LoginPage'));
          },
          error => {
            this.submitAttempt = false;
            loader.dismiss();
            this.presentAlerta(this.translate.instant('FALLO'), this.translate.instant('OCURRIO_ERROR'));
            this.errors = error;
            console.log(this.errors);
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
}

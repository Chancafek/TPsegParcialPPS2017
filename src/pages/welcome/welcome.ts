import { GeolocalizacionProvider } from './../../providers/geolocalizacion/geolocalizacion';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { NotificationProvider } from '../../providers/notification/notification';
import { AuthProvider } from './../../providers/auth/auth';
import { TranslateService } from '@ngx-translate/core';

/**
 * Generated class for the WelcomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private menu: MenuController,
    public notification: NotificationProvider,
    private alertCtrl : AlertController,
    private localizador: GeolocalizacionProvider,
    private _authService: AuthProvider,
    private translate: TranslateService
    ) {
     /*
        Deshabilito el sidemenu,
        para desarrollo lo dejo comentado por si necesitan acceder a otras páginas del menu
     */
    this.menu.enable(false);
    let gl = localStorage.getItem('educadroid_coords');
    if (gl == null) {
      this.localizador.getLocalizacion();
    }
  }

  ionViewDidLoad() {
    // this.notification.postNotification('Prueba de notificacion');
    this.menu.enable(false);
    this._authService.logout();
    console.log(this.translate.instant('CONTRASEÑA_REQUERIDA'));
  }
  login() {
    this.navCtrl.push('LoginPage');
  }

  signup() {
    this.navCtrl.push('SignupPage');
  }

  changeLenguage(){
    let alert = this.alertCtrl.create();
    alert.setTitle(this.translate.instant('SELECCIONAR_LENGUAJE'));

    alert.addInput({
      type: 'radio',
      label: this.translate.instant('ESPAÑOL'),
      value: 'es',
      checked: this.translate.currentLang=="es"
    });

    alert.addInput({
      type: 'radio',
      label: this.translate.instant('INGLES'),
      value: 'en',
      checked: this.translate.currentLang=="en"
    });

    alert.addButton(this.translate.instant('CANCELAR'));
    alert.addButton({
      text: 'OK',
      handler: data => {
        console.log(data);
        //this.translate.setDefaultLang(data);
        console.info(this.translate.getLangs());
        this.translate.use(data).subscribe(
          res=>console.log(res,this.translate.currentLang)
        );
      }
    });
    alert.present();
  }
}

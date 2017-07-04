import { GeolocalizacionProvider } from './../../providers/geolocalizacion/geolocalizacion';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { NotificationProvider } from '../../providers/notification/notification';
import { AuthProvider } from './../../providers/auth/auth';

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
    private _authService: AuthProvider
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
  }
  login() {
    this.navCtrl.push('LoginPage');
  }

  signup() {
    this.navCtrl.push('SignupPage');
  }
}

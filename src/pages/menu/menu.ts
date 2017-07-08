import { PushNotificationsProvider } from './../../providers/push-notifications/push-notifications';
import { IdentityProvider } from './../../providers/identifier/identifier';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController } from 'ionic-angular';
import { tokenNotExpired } from 'angular2-jwt';
import { Vibration } from '@ionic-native/vibration';
import { NotificationProvider } from './../../providers/notification/notification';

// https://www.youtube.com/watch?v=V8342s0xAsY

/**
 * Generated class for the MenuPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  perfil: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private identifier: IdentityProvider,
    public menu: MenuController,
    private vibration: Vibration,
    private notificador: PushNotificationsProvider,
    )
  {
      this.menu.enable(true);
      this.identifier.getUserProfile()
        .subscribe(
          data => this.perfil = data,
          err => console.log(err)
        );
  }

  ionViewDidLoad() {
  }

  mostrarCuestionarios() {
  	this.vibration.vibrate(100);
    this.navCtrl.push('EncuestaListPage');
  }

  mostrarGraficos() {
    this.vibration.vibrate(100);
    this.navCtrl.push('ChartsPage');
  }

  mostrarUsuarios() {
  	this.vibration.vibrate(100);
    this.navCtrl.push('ListUserPage');
  }

  enviarPush() {
  	this.vibration.vibrate(100);
    let prompt = this.alertCtrl.create({
      title: 'Notificar',
      message: "Ingrese un mensaje a notificar",
      inputs: [
        {
          name: 'mensaje',
          placeholder: 'Mensaje'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.notificador.sendNotification('Educadroid', data.toString())
              .subscribe(res => console.log(res));
          }
        }
      ]
    });
    prompt.present();
  }
}

import { PushNotificationsProvider } from './../../providers/push-notifications/push-notifications';
import { IdentityProvider } from './../../providers/identifier/identifier';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController } from 'ionic-angular';
import { Vibration } from '@ionic-native/vibration';
import { TranslateService } from '@ngx-translate/core';

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
    private translate: TranslateService
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
      title: this.translate.getDefaultLang()=="es" ? 'Notificar' : "Notify" ,
      message: this.translate.getDefaultLang()=="es" ? "Ingrese un mensaje a notificar" : "Input a message to send",
      inputs: [
        {
          name: this.translate.getDefaultLang()=="es" ? 'Mensaje' : "Message",
          placeholder: this.translate.getDefaultLang()=="es" ? 'Mensaje' : "Message"
        },
      ],
      buttons: [
        {
          text: this.translate.getDefaultLang()=="es" ? 'Cancelar' : 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: this.translate.getDefaultLang()=="es" ? 'Enviar' : 'Send',
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

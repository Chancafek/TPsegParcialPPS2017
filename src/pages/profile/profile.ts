import { PushNotificationsProvider } from './../../providers/push-notifications/push-notifications';
import { NotificationProvider } from './../../providers/notification/notification';
import { IdentityProvider } from './../../providers/identifier/identifier';
import { UserProvider } from './../../providers/user/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, MenuController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { TranslateService } from '@ngx-translate/core';

/**
 * Generated class for the ProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  perfil: any;
  private cameraOptions: CameraOptions;
  private galleryOptions: CameraOptions;
  public profileImage: string = 'assets/img/male.png';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _userService: UserProvider,
    private identifier: IdentityProvider,
    private actionSheetCtrl: ActionSheetController,
    private camera: Camera,
    private alertCtrl: AlertController,
    private notificador: NotificationProvider,
    private menu: MenuController,
    private pushNotifier: PushNotificationsProvider,
    private translate: TranslateService
    ) {
      this.menu.enable(true);
      this.identifier.getUserProfile()
        .subscribe(
          data => this.perfil = data,
          err => console.log(err)
        );

      this.cameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.FILE_URI,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        targetHeight: 512,
        targetWidth: 512,
        allowEdit: true,
        correctOrientation: true,
      }
      this.galleryOptions = {
        quality: 100,
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        destinationType: this.camera.DestinationType.FILE_URI,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        targetHeight: 512,
        targetWidth: 512,
        allowEdit: true,
        correctOrientation: true,
      }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');

  }

  cambiarFoto() {
    let actionSheet = this.actionSheetCtrl.create({
      title: this.translate.currentLang=="es" ? 'Cambiar imagen de perfil' : "Change profile image",
      cssClass: 'profile-img-actionsheet',
      buttons: [
        {
          text: this.translate.currentLang=="es" ? 'Galeria' : "Galery",
          icon: 'md-images',
          handler: () => {
            this.camera.getPicture(this.galleryOptions).then((imageData) => {
            // imageData is either a base64 encoded string or a file URI
            // If it's base64:
            this.profileImage = imageData;
            }, (err) => {
             console.log(err);
            });
          }
        },{
          text: this.translate.currentLang=="es" ? 'Foto' : "Photo",
          icon: 'md-camera',
          handler: () => {
            this.camera.getPicture(this.cameraOptions).then((imageData) => {
            // imageData is either a base64 encoded string or a file URI
            // If it's base64:
            this.profileImage = imageData;
            }, (err) => {
             console.log(err);
            });
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

  mostrarCuestionarios() {
    this.navCtrl.push('EncuestaListPage');
  }

  mostrarUsuarios() {
    this.navCtrl.push('ListUserPage');
  }

}

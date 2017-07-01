import { NotificationProvider } from './../../providers/notification/notification';
import { User } from './../../models/user';
import { IdentityProvider } from './../../providers/identifier/identifier';
import { UserProvider } from './../../providers/user/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, MenuController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

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
    private menu: MenuController
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
      title: 'Cambiar imagen de perfil',
      cssClass: 'profile-img-actionsheet',
      buttons: [
        {
          text: 'Galeria',
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
          text: 'Foto',
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
          text: 'Cancel',
          icon: 'md-redo',
          role: 'cancel',
        }
      ],
      enableBackdropDismiss: true
    });
    actionSheet.present();
  }

  mostrarCuestionarios() {

  }

  mostrarUsuarios() {
    this.navCtrl.push('ListUserPage');
  }

  enviarPush() {
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
            this.notificador.postNotification(data)
              .then(
                d => console.log('Enviado')
              )
          }
        }
      ]
    });
    prompt.present();
  }

}

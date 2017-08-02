import { tokenNotExpired } from 'angular2-jwt';
import { LoginPage } from './../pages/login/login';
import { MenuPage } from './../pages/menu/menu';
import { ProfilePage } from './../pages/profile/profile';
import { AuthProvider } from './../providers/auth/auth';
import { IdentityProvider } from './../providers/identifier/identifier';
import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { AndroidFullScreen } from '@ionic-native/android-full-screen';
import { NotificationProvider } from '../providers/notification/notification';

import { TranslateService } from '@ngx-translate/core';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage:any = 'WelcomePage';
  activePage: any = 'WelcomePage';
  imgProfile: any = 'male.png';
  userName: string;

  @ViewChild(Nav) nav: Nav;

  pages: any[] = [
    //{ mask: 'Bienvenido', title: 'WelcomePage', component: WelcomePage},
    //{ mask:'Inicio', title: 'HomePage', component: HomePage},
    { mask:'MENU_PRINCIPAL', title: 'MenuPage', component: MenuPage},
    //{ mask: 'Menu', title: 'MenuPage', component: MenuPage},
    { mask: 'MI_PERFIL', title: 'ProfilePage', component: ProfilePage},
    // { mask: 'Encuestas', title: 'EncuestaBuilderPage', component: EncuestaBuilderPage},
    // { mask: 'Preguntas', title: 'PreguntaBuilderPage', component: PreguntaBuilderPage},
    // { mask: 'Form Encuestas', title: 'EncuestaFormPage', component: EncuestaFormPage},
    //{ mask: 'Lista Encuestas', title: 'EncuestaListPage', component: EncuestaListPage},
    { mask: 'CERRAR_SESION', title: 'WelcomePage', component: LoginPage},
  ]

  constructor (
    private platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    public notification: NotificationProvider,
    private identifier: IdentityProvider,
    private auth: AuthProvider,
    private alertCtrl: AlertController,
    private screenOrientation: ScreenOrientation,
    private androidFullScreen: AndroidFullScreen,
    private translate: TranslateService
              )
  {
    this.platform.ready().then(() => {
      this.translate.setDefaultLang('en');
      this.translate.use('pr');
      this.translate.use('es');
      this.translate.addLangs(['en','es','pr']);
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      setTimeout(
        () => this.splashScreen.hide(), 4000
        );
      let notificationOpenedCallback = function(jsonData) {
        console.log(jsonData);
        // console.log(jsonData.notification.ad)
        if(tokenNotExpired('token_educadroid')) {
          let alert = alertCtrl.create({
            title: jsonData.notification.payload.title,
            subTitle: jsonData.notification.payload.body,
            buttons: [
              {
                text: 'OK',
                handler: () => {
                  if(jsonData.notification.payload.additionalData.idEncuesta) {
                    const id_encuesta = parseInt(jsonData.notification.payload.additionalData.idEncuesta);
                    this.nav.setRoot('EncuestaFormPage', { idEncuesta : id_encuesta});
                  }
                }
              }
            ]
          });
          alert.present();
        }

      };
      window["plugins"].OneSignal
        .startInit("ab09245a-0262-4d50-9a12-c9c19c5391f4", "educadroid-eb6d1")
        .handleNotificationOpened(notificationOpenedCallback)
        .endInit();
      if (this.platform.is('cordova'))
      {
        this.androidFullScreen.isImmersiveModeSupported()
          .then(() => this.androidFullScreen.immersiveMode())
          .catch((error: any) => console.log(error));
        this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);

        this.notification.registerToken();
        this.notification.getNotifications();
      }
    });
      if (this.auth.loggedIn()) {
        this.userName = this.identifier.getIdentity().nombre + ' ' + this.identifier.getIdentity().apellido;
        let u_img = this.identifier.getIdentity().image;
        if (u_img == null) {
          if (!this.identifier.isMale()) {
            this.imgProfile = 'female.png';
          }
        } else {
          this.imgProfile = u_img;
        }
      }
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.title);
    this.activePage = page.title;
  }

  checkActive(page) {
    return this.activePage === page.title;
  }

  exitApp() {
    this.platform.exitApp();
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

    alert.addInput({
      type: 'radio',
      label: this.translate.instant('PORTUGUES'),
      value: 'pr',
      checked: this.translate.currentLang=="pr"
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


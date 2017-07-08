import { tokenNotExpired } from 'angular2-jwt';
import { LoginPage } from './../pages/login/login';
import { MenuPage } from './../pages/menu/menu';
import { ProfilePage } from './../pages/profile/profile';
import { AuthProvider } from './../providers/auth/auth';
import { IdentityProvider } from './../providers/identifier/identifier';
// import { WelcomePage } from './../pages/welcome/welcome';
// import { EncuestaBuilderPage } from "../pages/encuesta-builder/encuesta-builder";
// import { PreguntaBuilderPage } from '../pages/pregunta-builder/pregunta-builder';
// import { EncuestaFormPage } from "../pages/encuesta-form/encuesta-form";
import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { AndroidFullScreen } from '@ionic-native/android-full-screen';
import { NotificationProvider } from '../providers/notification/notification';

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
    { mask:'Inicio', title: 'MenuPage', component: MenuPage},
    //{ mask: 'Menu', title: 'MenuPage', component: MenuPage},
    { mask: 'Mi Perfil', title: 'ProfilePage', component: ProfilePage},
    // { mask: 'Encuestas', title: 'EncuestaBuilderPage', component: EncuestaBuilderPage},
    // { mask: 'Preguntas', title: 'PreguntaBuilderPage', component: PreguntaBuilderPage},
    // { mask: 'Form Encuestas', title: 'EncuestaFormPage', component: EncuestaFormPage},
    //{ mask: 'Lista Encuestas', title: 'EncuestaListPage', component: EncuestaListPage},
    { mask: 'Logout', title: 'WelcomePage', component: LoginPage},
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
              )
  {
    this.platform.ready().then(() => {
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
}


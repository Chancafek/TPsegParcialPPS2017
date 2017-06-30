import { ProfilePage } from './../pages/profile/profile';
import { AuthProvider } from './../providers/auth/auth';
import { IdentityProvider } from './../providers/identifier/identifier';
import { SignupPage } from './../pages/signup/signup';
import { LoginPage } from './../pages/login/login';
import { HomePage } from './../pages/home/home';
import { WelcomePage } from './../pages/welcome/welcome';
import { EncuestaBuilderPage } from "../pages/encuesta-builder/encuesta-builder";
import { PreguntaBuilderPage } from '../pages/pregunta-builder/pregunta-builder';
import { EncuestaFormPage } from "../pages/encuesta-form/encuesta-form";
import { EncuestaListPage } from "../pages/encuesta-list/encuesta-list";
import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { NotificationProvider } from '../providers/notification/notification';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = 'HomePage';
  activePage: any = 'HomePage';
  imgProfile: any = 'male.png';

  @ViewChild(Nav) nav: Nav;

  pages: any[] = [
    { mask: 'Bienvenido', title: 'WelcomePage', component: WelcomePage},
    { mask: 'Mi Perfil', title: 'ProfilePage', component: ProfilePage},
    { mask:'Inicio', title: 'HomePage', component: HomePage},
    { mask: 'Login', title: 'LoginPage', component: LoginPage},
    { mask: 'Registro', title: 'SignupPage', component: SignupPage},
    { mask: 'Encuestas', title: 'EncuestaBuilderPage', component: EncuestaBuilderPage},
    { mask: 'Preguntas', title: 'PreguntaBuilderPage', component: PreguntaBuilderPage},
    { mask: 'Form Encuestas', title: 'EncuestaFormPage', component: EncuestaFormPage},
    { mask: 'Lista Encuestas', title: 'EncuestaListPage', component: EncuestaListPage}
  ]

  constructor(private platform: Platform, statusBar: StatusBar,
              splashScreen: SplashScreen,
              public notification: NotificationProvider,
              private identifier: IdentityProvider,
              private auth: AuthProvider
              )
  {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      if (platform.is('cordova'))
      {
        this.notification.registerToken();
        this.notification.getNotifications();
      }
    });
      if (this.auth.loggedIn()) {
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


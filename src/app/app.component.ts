import { SignupPage } from './../pages/signup/signup';
import { LoginPage } from './../pages/login/login';
import { HomePage } from './../pages/home/home';
import { WelcomePage } from './../pages/welcome/welcome';
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

  @ViewChild(Nav) nav: Nav;

  pages: any[] = [
    { title: 'WelcomePage', component: WelcomePage},
    { title: 'HomePage', component: HomePage},
    { title: 'LoginPage', component: LoginPage},
    { title: 'SignupPage', component: SignupPage}
  ]

  constructor(platform: Platform, statusBar: StatusBar,
              splashScreen: SplashScreen,
              public notification: NotificationProvider)
  {
    platform.ready().then(() => {
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
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.title);
  }
}


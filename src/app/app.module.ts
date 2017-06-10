import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { PreguntaBuilderPage } from "../pages/pregunta-builder/pregunta-builder";

import { HttpModule } from '@angular/http';

import { NotificationProvider } from '../providers/notification/notification';

/* Ionic cloud settings */
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

/* Firebase */
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

export const firebaseConfig = {
    apiKey: "AIzaSyBJlf1cacuUbTVvwg8JdZoBapDFcxtoa1Q",
    authDomain: "educadroid-eb6d1.firebaseapp.com",
    databaseURL: "https://educadroid-eb6d1.firebaseio.com",
    projectId: "educadroid-eb6d1",
    storageBucket: "educadroid-eb6d1.appspot.com",
    messagingSenderId: "535933385921"
};

const cloudSettings: CloudSettings = {
  core: {
    'app_id': '3f768b3b'
  },
  push: {
    sender_id: '535933385921',
    pluginConfig: {
      ios: {
        badge: true,
        sound: true
      },
      android: {
        iconColor: '#343434',
        forceShow: true
      }
    }
  }
}

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    CloudModule.forRoot(cloudSettings),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    PreguntaBuilderPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    NotificationProvider
  ]
})
export class AppModule {}

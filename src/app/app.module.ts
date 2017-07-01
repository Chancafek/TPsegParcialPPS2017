import { Camera } from '@ionic-native/camera';
import { Diagnostic } from '@ionic-native/diagnostic';
import { Geolocation } from '@ionic-native/geolocation';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { IdentityProvider } from './../providers/identifier/identifier';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { NotificationProvider } from '../providers/notification/notification';
import { UserProvider } from '../providers/user/user';
import { EncuestaProvider } from '../providers/encuesta/encuesta';

/* Ionic cloud settings */
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

/* Firebase */
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthProvider } from '../providers/auth/auth';
import { GeolocalizacionProvider } from '../providers/geolocalizacion/geolocalizacion';
import { UploaderProvider } from '../providers/uploader/uploader';
import { CursosProvider } from '../providers/cursos/cursos';


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
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Diagnostic,
    GeolocalizacionProvider,
    Camera,
    Geolocation,
    AndroidPermissions,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    NotificationProvider,
    UserProvider,
    IdentityProvider,
    EncuestaProvider,
    AuthProvider,
    GeolocalizacionProvider,
    UploaderProvider,
    CursosProvider
  ]
})
export class AppModule {}

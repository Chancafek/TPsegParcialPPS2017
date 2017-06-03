import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignupPage } from './signup';

export const firebaseConfig = {
    apiKey: "AIzaSyBJlf1cacuUbTVvwg8JdZoBapDFcxtoa1Q",
    authDomain: "educadroid-eb6d1.firebaseapp.com",
    databaseURL: "https://educadroid-eb6d1.firebaseio.com",
    projectId: "educadroid-eb6d1",
    storageBucket: "educadroid-eb6d1.appspot.com",
    messagingSenderId: "535933385921"
};

@NgModule({
  declarations: [
    SignupPage,
  ],
  imports: [
    IonicPageModule.forChild(SignupPage),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  exports: [
    SignupPage
  ]
})
export class SignupPageModule {}

import { User } from './../../models/user';
import { MenuController } from 'ionic-angular';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

/**
 * Generated class for the SignupPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  user: User;

  constructor(public navCtrl: NavController, public navParams: NavParams, private menu: MenuController, private af: AngularFireAuth) {
    this.user = new User();
      /*
        Deshabilito el sidemenu,
        para desarrollo lo dejo comentado por si necesitan acceder a otras páginas del menu
      */
    //this.menu.enable(false);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  onSubmit() {
    this.af.auth.createUserWithEmailAndPassword(
      this.user.email,
      this.user.password
    ).then(() => console.log('Usuario creado'))
    .catch((e) => console.log('error '+ e));
  }

}

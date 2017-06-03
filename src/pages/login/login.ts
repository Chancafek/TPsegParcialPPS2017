import { MenuController } from 'ionic-angular';
import { User } from './../../models/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user: User;

  constructor(public navCtrl: NavController, public navParams: NavParams, private menu: MenuController, private af: AngularFireAuth) {
    /*
        Deshabilito el sidemenu,
        para desarrollo lo dejo comentado por si necesitan acceder a otras páginas del menu
    */
    //this.menu.enable(false);
    this.user = new User();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    if(this.af.auth.currentUser) {
      this.af.auth.signOut().then(() => {
        console.log('Logout!');
        console.log(this.af.auth.currentUser);
      }).catch((e) => console.log(e));
    }


  }

  doLogin() {
    this.af.auth
      .signInWithEmailAndPassword(this.user.email, this.user.password)
      .then(() => {
        console.log(this.af.auth.currentUser.email);
        this.af.auth.currentUser.getIdToken().then((t) => console.log(t));
      });
  }
}

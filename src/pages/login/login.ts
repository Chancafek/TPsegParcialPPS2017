import { MenuController } from 'ionic-angular';
import { User } from './../../models/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private menu: MenuController) {
    /*
        Deshabilito el sidemenu,
        para desarrollo lo dejo comentado por si necesi acceder a otras páginas del menu
    */
    //this.menu.enable(false);
    this.user = new User();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}

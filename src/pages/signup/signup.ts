import { MenuController } from 'ionic-angular';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private menu: MenuController) {
      /*
        Deshabilito el sidemenu,
        para desarrollo lo dejo comentado por si necesi acceder a otras páginas del menu
      */
    //this.menu.enable(false);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

}

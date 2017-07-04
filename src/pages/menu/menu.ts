import { IdentityProvider } from './../../providers/identifier/identifier';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { tokenNotExpired } from 'angular2-jwt';

// https://www.youtube.com/watch?v=V8342s0xAsY

/**
 * Generated class for the MenuPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  perfil: any;

  constructor(public navCtrl: NavController,
    private identifier: IdentityProvider,
    public menu: MenuController)
  {
      this.menu.enable(true);
      this.identifier.getUserProfile()
        .subscribe(
          data => this.perfil = data,
          err => console.log(err)
        );
  }

  ionViewDidLoad() {
  }

}
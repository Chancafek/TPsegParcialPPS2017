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
  user: any;

  constructor(public navCtrl: NavController,
    private identifier: IdentityProvider,
    public menu: MenuController)
  {
  }

  ionViewDidLoad() {
    this.menu.enable(true);
    /* Verifico que el usuario este logueado */
  	if (!tokenNotExpired('access_token')) { // retorna false si el token no existe o es inválido
      /*
        si no es válido lo mando a registrarse o iniciar sesión,
        para desarrollo lo dejo comentado por si necesitan acceder a otras páginas del menu
      */
    	//this.navCtrl.setRoot('WelcomePage');
    }
    this.user= this.identifier.getIdentity();
  }

}
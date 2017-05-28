import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { tokenNotExpired } from 'angular2-jwt';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }
  ionViewDidLoad() {
    /* Verifico que el usuario este logueado */
  	if (!tokenNotExpired('access_token')) { // retorna false si el token no existe o es inválido
      /*
        si no es válido lo mando a registrarse o iniciar sesión,
        para desarrollo lo dejo comentado por si necesi acceder a otras páginas del menu
      */
    	//this.navCtrl.setRoot('WelcomePage');
    }
  }
}

import { IdentityProvider } from './../../providers/identifier/identifier';
import { Component } from '@angular/core';
import { IonicPage, NavController, MenuController } from 'ionic-angular';
import { tokenNotExpired } from 'angular2-jwt';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  user: any;
  isAdministrador: boolean = true;
  isAdministrativo: boolean = true;
  isProfesor: boolean = true;
  isAlumno: boolean = true;

  constructor(
    public navCtrl: NavController,
    private identifier: IdentityProvider,
    public menu: MenuController
    ) {

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

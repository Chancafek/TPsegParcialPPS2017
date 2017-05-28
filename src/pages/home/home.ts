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
    console.log('Not Logged');
  	if (!tokenNotExpired('access_token')) {
      console.log('Not Logged');
    	this.navCtrl.setRoot('WelcomePage');
    }
  }
}

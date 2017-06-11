import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Encuesta } from "../../models/encuesta";

/**
 * Generated class for the EncuestaBuilderPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-encuesta-builder',
  templateUrl: 'encuesta-builder.html',
})
export class EncuestaBuilderPage {

  private encuesta: Encuesta = new Encuesta();

  private tematica: String;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EncuestaBuilderPage');
  }

  crear() {
    /* Debemos instanciar la encuesta con el id del usuario */
    
    this.navCtrl.push('PreguntaBuilderPage', {encuesta:this.encuesta});
    
  }

}

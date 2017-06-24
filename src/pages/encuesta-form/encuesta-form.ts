import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Encuesta } from "../../models/encuesta";
import { Pregunta } from "../../models/pregunta";

/**
 * Generated class for the EncuestaFormPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-encuesta-form',
  templateUrl: 'encuesta-form.html',
})
export class EncuestaFormPage {

  private pregunta: Pregunta;
  private encuesta: Encuesta;

  private opcion1: String;
  private opcion2: String;
  private opcion3: String;

  private respuestaCheck1: Boolean;
  private respuestaCheck2: Boolean;
  private respuestaCheck3: Boolean;

  private respuestaTexto: String;

  private respuestaRadio: String;


  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EncuestaFormPage');
  }

  send(){
    
  }
}

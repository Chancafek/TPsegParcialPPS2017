import { Encuesta } from '../../models/encuesta';
import { Pregunta } from '../../models/pregunta';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PreguntaBuilderPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-pregunta-builder',
  templateUrl: 'pregunta-builder.html',
})
export class PreguntaBuilderPage implements OnInit {

  private encuesta: Encuesta;

  private pregunta: Pregunta = new Pregunta();

  private opcion1: String;
  private opcion2: String;
  private opcion3: String;

  private respuesta1: Boolean;
  private respuesta2: Boolean;
  private respuesta3: Boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PreguntaBuilderPage');
  }

  ngOnInit() {
    this.encuesta = this.navParams.get("encuesta");
    console.log(this.encuesta);
  }

  onChangeTipo(event:Event){
    this.opcion1=undefined;
    this.opcion2=undefined;
    this.opcion3=undefined;
    this.respuesta1=undefined;
    this.respuesta2=undefined;
    this.respuesta3=undefined;
  }

}

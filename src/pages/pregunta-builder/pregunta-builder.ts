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

  private consigna : String;
  private tipo : Number;
  private opciones = {};
  private respuestas = {};

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PreguntaBuilderPage');
  }

  ngOnInit() {
    this.encuesta = this.navParams.get("encuesta");
  }
}

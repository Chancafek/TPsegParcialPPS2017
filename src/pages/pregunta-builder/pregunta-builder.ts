import { Encuesta } from '../../models/encuesta';
import { Pregunta } from '../../models/pregunta';
import { Component, OnInit } from '@angular/core';
import { ETipoPregunta } from "../../models/ETipoPregunta";
import { IonicPage, NavController, NavParams, AlertController, ActionSheetController } from 'ionic-angular';

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

  private respuestaCheck1: Boolean;
  private respuestaCheck2: Boolean;
  private respuestaCheck3: Boolean;

  private respuestaTexto: String;

  private respuestaRadio: String;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public alertCtrl: AlertController, public actionSheetCtrl: ActionSheetController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PreguntaBuilderPage');
  }

  ngOnInit() {
    this.encuesta = this.navParams.get("encuesta");
    console.log(this.encuesta);

    if (this.encuesta != null) {
      console.log(this.encuesta.preguntas);
    }
  }

  onChangeTipo(event: Event) {
    this.opcion1 = undefined;
    this.opcion2 = undefined;
    this.opcion3 = undefined;
    this.respuestaCheck1 = undefined;
    this.respuestaCheck2 = undefined;
    this.respuestaCheck3 = undefined;
    this.respuestaRadio = undefined;
    this.respuestaTexto = undefined;

  }

  done() {

    /*Valido los checkbox*/
    if (ETipoPregunta.CHECKBOX.toLocaleString() == this.pregunta.tipo.toLocaleString() &&
      !(this.respuestaCheck1 || this.respuestaCheck2 || this.respuestaCheck3)) {

      let alert = this.alertCtrl.create({
        title: 'Atención',
        subTitle: 'Indique al menos una opción correcta',
        buttons: ['OK']
      });

      alert.present();

    } else {

      let action = this.actionSheetCtrl.create({
        title: '¿Qué desea seguir haciendo?',
        buttons: [
          {
            text: 'Guardar y finalizar cuestionario',
            role: 'destructive',
            handler: () => {
              console.log('Guardo y finalizo');
            }
          },
          {
            text: 'Guardar y agregar otra pregunta',
            handler: () => {
              console.log('Guardo y agrego otra');
            }
          },
          {
            text: 'Cancelar',
            handler: () => {
              console.log('Sigo editando la pregunta');
            }
          }
        ]
      });

      action.present();

      // this.insertPregunta();
      // console.log(this.encuesta);
    }

  }

  /*Inserta la pregunta a la encuesta*/
  insertPregunta() {

    if (ETipoPregunta.CHECKBOX.toLocaleString() == this.pregunta.tipo.toLocaleString()) {

      this.pregunta.tipo = ETipoPregunta.CHECKBOX;
      this.pregunta.opciones.push(this.opcion1);
      this.pregunta.opciones.push(this.opcion2);
      this.pregunta.opciones.push(this.opcion3);
      if (this.respuestaCheck1) {
        this.pregunta.respuestas.push("1");
      }
      if (this.respuestaCheck2) {
        this.pregunta.respuestas.push("2");
      }
      if (this.respuestaCheck3) {
        this.pregunta.respuestas.push("3");
      }

    } else if (ETipoPregunta.RADIOBUTTON.toLocaleString() == this.pregunta.tipo.toLocaleString()) {

      this.pregunta.tipo = ETipoPregunta.RADIOBUTTON
      this.pregunta.opciones.push(this.opcion1);
      this.pregunta.opciones.push(this.opcion2);
      this.pregunta.opciones.push(this.opcion3);
      this.pregunta.respuestas.push(this.respuestaRadio);

    } else if (ETipoPregunta.TEXT.toLocaleString() == this.pregunta.tipo.toLocaleString()) {

      this.pregunta.tipo = ETipoPregunta.TEXT;
      this.pregunta.respuestas.push(this.respuestaTexto);

    }

    this.encuesta.preguntas.push(this.pregunta);
  }
}

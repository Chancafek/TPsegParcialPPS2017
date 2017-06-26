import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Encuesta } from "../../models/encuesta";
import { Pregunta } from "../../models/pregunta";
import { ETipoPregunta } from "../../models/ETipoPregunta";
import { EncuestaProvider } from "../../providers/encuesta/encuesta";

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
export class EncuestaFormPage implements OnInit {

  private encuesta: Encuesta = new Encuesta();

  private pregunta: Pregunta = new Pregunta();

  /* Base 0 */
  private numeroPregunta: number = 0;

  private respuestaCheck1: Boolean;
  private respuestaCheck2: Boolean;
  private respuestaCheck3: Boolean;

  private respuestaTexto: String;

  private respuestaRadio: String;


  constructor(public navCtrl: NavController, public navParams: NavParams,
    public encuestaService: EncuestaProvider, public alertCtrl: AlertController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EncuestaFormPage');
  }

  ngOnInit() {

    if (this.navParams.get('encuesta') != null) {

      this.encuesta = this.navParams.get('encuesta');

      if (this.navParams.get('numeroPregunta') == null) {

        this.pregunta = Pregunta.buildPregunta(this.encuesta.preguntas[0]);

      } else {

        this.numeroPregunta = this.navParams.get('numeroPregunta');
        this.pregunta = Pregunta.buildPregunta(this.encuesta.preguntas[this.numeroPregunta]);

      }

    } else if (this.navParams.get('idEncuesta') != null) {

      let id: Number = this.navParams.get('idEncuesta');
      console.log("voy a cargar este cuestionario : " + id);
      this.encuestaService.getById(id).subscribe(
        response => {
          this.encuesta = response;
          this.pregunta = Pregunta.buildPregunta(this.encuesta.preguntas[0]);
          console.log(this.pregunta);
        },
        error => console.error(error)
      );

    }
  }

  send() {

    if (ETipoPregunta.CHECKBOX.toLocaleString() == this.pregunta.tipo.toLocaleString() &&
      !(this.respuestaCheck1 || this.respuestaCheck2 || this.respuestaCheck3)) {

      let alert = this.alertCtrl.create({
        title: 'Atención',
        subTitle: 'Indique al menos una opción correcta',
        buttons: ['OK']
      });

      alert.present();

    } else {

      this.pregunta.resultado = this.corregirPregunta();
      console.log(this.pregunta.resultado);
      // if (this.encuesta.preguntas.length > this.numeroPregunta + 1) {
      //   this.navCtrl.push('EncuestaFormPage', { numeroPregunta: this.numeroPregunta + 1, encuesta: this.encuesta });
      // } else {
      //   //ACA IMPLEMENTAR UNA SALIDA DEL FORMULARIO
      //   this.encuestaService.saveResultados(this.encuesta).subscribe(
      //     response => {
      //       console.log(response);
      //       let alert = this.alertCtrl.create({
      //         title: 'Información',
      //         subTitle: 'Se ha enviado el cuestionario. Los resultados se encuentran a disposición del docente.',
      //         buttons: ['OK']
      //       });

      //       alert.present();

      //       this.navCtrl.popTo('EncuestaListPage');
      //     },
      //     error => {
      //       console.error(error);
      //     }
      //   )
      // }

    }

  }

  corregirPregunta(): Boolean {

    let resultado = true;

    switch (this.pregunta.tipo) {
      case 1:

        if (this.respuestaCheck1 != this.pregunta.respuestas.some(x => x === "1")) {
          return false;
        }

        if (this.respuestaCheck2 != this.pregunta.respuestas.some(x => x === "2")) {
          return false;
        }

        if (this.respuestaCheck3 != this.pregunta.respuestas.some(x => x === "3")) {
          return false;
        }

        break;

      case 2:

        if (this.respuestaRadio != this.pregunta.respuestas[0]) {
          return false;
        }

        break;

      case 3:

        if (this.respuestaTexto.toLowerCase() != this.pregunta.opciones[0].toLowerCase()) {
          return false;
        }

        break;
    }

    return resultado;
  }
}

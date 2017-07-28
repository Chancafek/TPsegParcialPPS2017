import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Encuesta } from "../../models/encuesta";
import { Pregunta } from "../../models/pregunta";
import { ETipoPregunta } from "../../models/ETipoPregunta";
import { EncuestaProvider } from "../../providers/encuesta/encuesta";
import { IdentityProvider } from "../../providers/identifier/identifier";
import { TranslateService } from '@ngx-translate/core';

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

  private resultados: Boolean[] = new Array<Boolean>();

  private respuestaCheck1: Boolean = false;
  private respuestaCheck2: Boolean = false;
  private respuestaCheck3: Boolean = false;

  private respuestaTexto: String;

  private respuestaRadio: String;


  constructor(public navCtrl: NavController, public navParams: NavParams,
    public encuestaService: EncuestaProvider, public alertCtrl: AlertController,
    public identityService: IdentityProvider, public translate: TranslateService,
    public loadingCtrl: LoadingController) {

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
        this.resultados = this.navParams.get('resultados');
        this.pregunta = Pregunta.buildPregunta(this.encuesta.preguntas[this.numeroPregunta]);

      }

    } else if (this.navParams.get('idEncuesta') != null) {

      let id: Number = this.navParams.get('idEncuesta');
      console.log("voy a cargar este cuestionario : " + id);
      let loader = this.loadingCtrl.create({
        content: this.translate.currentLang=="es" ? "Recuperando datos..." : "Loading data...",
      });
      loader.present();
      this.encuestaService.getById(id).subscribe(
        response => {
          this.encuesta = response;
          this.pregunta = Pregunta.buildPregunta(this.encuesta.preguntas[0]);
        },
        error => console.error(error),
        ()=>loader.dismiss()
      );

    }
  }

  send() {

    if (ETipoPregunta.CHECKBOX.toLocaleString() == this.pregunta.tipo.toLocaleString() &&
      !(this.respuestaCheck1 || this.respuestaCheck2 || this.respuestaCheck3)) {

      let alert = this.alertCtrl.create({
        title: this.translate.currentLang=="es" ? 'Atención' : 'Warning',
        subTitle: this.translate.currentLang=="es" ? 'Indique al menos una opción correcta' : "You must select at least one correct option",
        buttons: ['OK']
      });

      alert.present();

    } else {

      this.resultados.push(this.corregirPregunta());
      console.log(this.resultados);
      if (this.encuesta.preguntas.length > this.numeroPregunta + 1) {
        this.navCtrl.push('EncuestaFormPage', { numeroPregunta: this.numeroPregunta + 1, encuesta: this.encuesta, resultados: this.resultados });
      } else {
        //ACA IMPLEMENTAR UNA SALIDA DEL FORMULARIO
        let loader = this.loadingCtrl.create({
          content: this.translate.currentLang=="es" ? "Enviando datos..." : "Sending data...",
        });
        loader.present();
        this.encuestaService.saveResultados(this.encuesta, this.identityService.getIdentity().id, this.resultados).subscribe(
          response => {
            console.log("grabé!", response);
            let alert = this.alertCtrl.create({
              title: this.translate.currentLang=="es" ? 'Información' : 'Information',
              subTitle: this.translate.currentLang=="es" ? 'Se ha enviado el cuestionario. Los resultados se encuentran a disposición del docente.' : 'The questionnaire has been sent. The results are available to the teacher.',
              buttons: [{
                text: 'Ok',
                handler: () => {
                  console.log('Volviendo a la lista');
                  this.navCtrl.popToRoot();
                }
              }]
            });

            alert.present();
            
          },
          error => {
            console.error(error);
          },
          ()=>loader.dismiss()
        )
      }

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

import { Encuesta } from '../../models/encuesta';
import { Pregunta } from '../../models/pregunta';
import { Component, OnInit } from '@angular/core';
import { ETipoPregunta } from "../../models/ETipoPregunta";
import { IonicPage, NavController, NavParams, AlertController, ActionSheetController, LoadingController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

import { EncuestaProvider } from "../../providers/encuesta/encuesta";

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

  private encuesta_id: Number;

  private pregunta: Pregunta = new Pregunta();

  private opcion1: String;
  private opcion2: String;
  private opcion3: String;

  private respuestaCheck1: Boolean;
  private respuestaCheck2: Boolean;
  private respuestaCheck3: Boolean;

  private respuestaTexto: String;

  private respuestaRadio: String;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController, 
    public actionSheetCtrl: ActionSheetController,
    public encuestaService: EncuestaProvider,
    public translate: TranslateService,
    public loadingCtrl: LoadingController
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PreguntaBuilderPage');
  }

  ngOnInit() {

    if (this.navParams.get("encuesta") != null) {
      this.encuesta = this.navParams.get("encuesta");
    } else if(this.navParams.get("encuesta_id") != null){
      this.encuesta_id = this.navParams.get("encuesta_id");
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
        title: this.translate.instant('ATENCION'),
        subTitle: this.translate.instant('OPCION_CORRECTA'),
        buttons: ['OK']
      });

      alert.present();

    } else {
      console.log(this.encuesta_id);
      if (this.encuesta_id!=null) {

        let alert = this.alertCtrl.create({
          title: this.translate.instant('ATENCION'),
          subTitle: this.translate.instant('AGREGAR_PREGUNTA'),
          buttons: [{
            text: 'No',
            role: 'cancel',
            handler: data => {
              console.log('Cancel clicked');
            }
          },
          {
            text: this.translate.instant('SI'),
            handler: data => {
              let loader = this.loadingCtrl.create({
                content: this.translate.instant('ENVIANDO_DATOS'),
              });
              loader.present();
              this.encuestaService.savePregunta(this.pregunta,this.encuesta_id).subscribe(
                response=>console.log(response),
                error=>console.error(error),
                ()=>loader.dismiss()
              );
              this.navCtrl.popTo(this.navCtrl.getByIndex(1));
            }
          }]
        });
        alert.present();

      } else {

        let action = this.actionSheetCtrl.create({
          title: this.translate.instant('OPCIONES'),
          buttons: [
            {
              text: this.translate.instant('GUARDAR_FINALIZAR_CUESTIONARIO'),
              role: 'destructive',
              handler: () => {
                console.log('Guardo y finalizo');
                this.insertPregunta();
                let loader = this.loadingCtrl.create({
                  content: this.translate.instant('ENVIANDO_DATOS'),
                });
                loader.present();
                this.encuestaService.save(this.encuesta).subscribe(
                  response => {
                    console.log(response);
                    this.navCtrl.popToRoot();
                  },
                  error => {
                    console.error(error);
                  },
                  ()=>loader.dismiss()
                );
              }
            },
            {
              text: this.translate.instant('GUARDAR_AGREGAR_CUESTIONARIO'),
              handler: () => {
                console.log('Guardo y agrego otra');
                this.insertPregunta();
                this.navCtrl.push('PreguntaBuilderPage', { encuesta: this.encuesta })
              }
            },
            {
              text: this.translate.instant('CANCELAR_CUESTIONARIO'),
              handler: () => {
                console.log('Sigo editando la pregunta');
                let alert = this.alertCtrl.create({
                  title: this.translate.instant('ATENCION'),
                  subTitle: this.translate.instant('DESEA_SALIR'),
                  buttons: [{
                    text: 'No',
                    role: 'cancel',
                    handler: data => {
                      console.log('Cancel clicked');
                    }
                  },
                  {
                    text: this.translate.instant('SI'),
                    handler: data => {
                      this.navCtrl.popTo("EncuestaListPage");
                    }
                  }]
                });
                alert.present();
              }
            }
          ]
        });

        action.present();
      }

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
      this.pregunta.opciones.push(this.respuestaTexto);

    }

    this.encuesta.preguntas.push(this.pregunta);
  }

}

import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { EncuestaProvider } from "../../providers/encuesta/encuesta";
import { TranslateService } from '@ngx-translate/core';

/**
 * Generated class for the PreguntaListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-pregunta-list',
  templateUrl: 'pregunta-list.html',
})
export class PreguntaListPage implements OnInit {

  private preguntas;

  constructor(
    public navCtrl: NavController, public navParams: NavParams, public encuestaService: EncuestaProvider,
    public loadingCtrl: LoadingController, public translate: TranslateService
      ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PreguntaListPage');
  }

  ngOnInit(){
    this.preguntas = this.navParams.get("preguntas");
    console.log(this.preguntas);
  }

  createPregunta(){
    this.navCtrl.push("PreguntaBuilderPage",{encuesta_id:this.preguntas[0].encuesta_id});
  }

  delete(pregunta){
    let loader = this.loadingCtrl.create({
      content: this.translate.instant('ELIMINANDO_DATOS'),
    });
    loader.present();
    this.encuestaService.deletePregunta(pregunta.id).subscribe(
      response=>console.log(response),
      error=>console.error(error),
      ()=>loader.dismiss()
    );
  }

}

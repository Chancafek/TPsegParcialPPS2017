import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { IdentityProvider } from "../../providers/identifier/identifier";

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public identityService: IdentityProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EncuestaBuilderPage');
    if(this.navParams.get('encuesta')!=null){
      this.encuesta = this.navParams.get('encuesta');
    } else {
      this.encuesta = new Encuesta();
    }
  }

  crear() {
    /* Debemos instanciar la encuesta con el id del usuario */
    this.encuesta.id_user = this.identityService.getIdentity().id;
    this.navCtrl.push('PreguntaBuilderPage', {encuesta:this.encuesta});
    
  }

}

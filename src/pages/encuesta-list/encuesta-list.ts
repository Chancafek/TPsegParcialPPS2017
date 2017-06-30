import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Encuesta } from "../../models/encuesta";
import { EncuestaProvider } from "../../providers/encuesta/encuesta";
import { IdentityProvider } from "../../providers/identifier/identifier";

/**
 * Generated class for the EncuestaListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-encuesta-list',
  templateUrl: 'encuesta-list.html',
})
export class EncuestaListPage implements OnInit {

  private encuestas: Encuesta[] = new Array<Encuesta>();

  private isProfesor:boolean;
  private isAlumno:boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams,
   public encuestaService:EncuestaProvider, public indentityService:IdentityProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EncuestaListPage');
  }

  ngOnInit(){
    this.encuestaService.getAll()
      .subscribe(
        response => this.encuestas=response,
        error => console.error(error),
        () => console.log(this.encuestas)
    );
    this.isProfesor = this.indentityService.isProfesor();
    this.isAlumno = this.indentityService.isAlumno();
  }

  action(encuesta :Encuesta){
    this.navCtrl.push('EncuestaFormPage', {idEncuesta:encuesta.id});
  }

}

import { PushNotificationsProvider } from './../../providers/push-notifications/push-notifications';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController, LoadingController } from 'ionic-angular';
import { Encuesta } from "../../models/encuesta";
import { EncuestaProvider } from "../../providers/encuesta/encuesta";
import { IdentityProvider } from "../../providers/identifier/identifier";
import { CursosProvider } from "../../providers/cursos/cursos";
import { TranslateService } from '@ngx-translate/core';

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

  private isProfesor: boolean;
  private isAlumno: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public encuestaService: EncuestaProvider, public indentityService: IdentityProvider,
    public actionSheetCtrl: ActionSheetController, public alertCtrl: AlertController,
    public cursosService: CursosProvider,
    private notifier: PushNotificationsProvider,
    private translate: TranslateService,
    private loadingCtrl: LoadingController
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EncuestaListPage');
  }

  ionViewWillEnter(){
    let loader = this.loadingCtrl.create({
      content: this.translate.instant('RECUPERANDO_DATOS'),
    });
    loader.present();
    this.encuestaService.getAll().subscribe(
      response => this.encuestas = response as Array<Encuesta>,
      error => console.error(error),
      () => loader.dismiss()
    );
  }

  ngOnInit() {

    this.isProfesor = this.indentityService.getIdentity().apellido == "Profesor";
    this.isAlumno = this.indentityService.getIdentity().apellido != "Profesor";

    console.log(this.isProfesor);
    console.log(this.isAlumno);
    console.log(this.indentityService.getIdentity());

    // this.encuestaService.getByUser(this.indentityService.getIdentity().id).subscribe(
    //   response => this.encuestas = response,
    //   error => console.error(error),
    //   () => console.log(this.encuestas)
    // );

  }

  addCuestionario(){
    this.navCtrl.push('EncuestaBuilderPage');
  }

  action(encuesta: Encuesta) {
    if (this.isAlumno) {
      this.navCtrl.push('EncuestaFormPage', { idEncuesta: encuesta.id });
    } else if (this.isProfesor) {
      let action = this.actionSheetCtrl.create({
        title: this.translate.instant('OPCIONES'),
        buttons: [
          {
            text: this.translate.instant('DESPLEGAR_CUESTIONARIO'),
            role: 'destructive',
            handler: () => {
              console.log('Deploy encuestas');
              this.showAlert(encuesta);
            }
          },
          {
            text: this.translate.instant('MODIFICAR_CUESTIONARIO'),
            role: 'destructive',
            handler: () => {
              console.log('Modificar encuesta');
              this.navCtrl.push('PreguntaListPage', {preguntas:encuesta.preguntas});
            }
          },
          {
            text: this.translate.instant('ELIMINAR_CUESTIONARIO'),
            handler: () => {
              let alert = this.alertCtrl.create({
                title: this.translate.instant('ATENCION'),
                subTitle: this.translate.instant('DESEA_ELIMINAR_CUESTIONARIO'),
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
                    console.log('Elimino');
                    let loader = this.loadingCtrl.create({
                      content: this.translate.instant('ELIMINANDO_DATOS'),
                    });
                    loader.present();
                    this.encuestaService.deleteEncuesta(encuesta.id).subscribe(
                      response => this.ionViewWillEnter(),
                      error => console.error(error),
                      ()=>loader.dismiss()
                    );
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

  showAlert(encuesta: Encuesta) {

    let cursos: any[];

    // this.cursosService.getByUser(this.indentityService.getIdentity().id).subscribe(
    //   response => {
    //     cursos = response;
    //     console.log(cursos);
    //   }
    // );

    this.cursosService.getAll().subscribe(
      response => {
        cursos = response;
        console.log(cursos);

        let alert = this.alertCtrl.create();

        if (cursos.length > 0) {

          alert.setTitle(this.translate.instant('DONDE_DESPLEGAR_CUESTIONARIO'));

          cursos.forEach(item => {
            alert.addInput({
              type: 'checkbox',
              label: item.materia.nombre + ' - ' + item.division.codigo,
              value: item.materia.nombre + ' - ' + item.division.codigo
            });
          });

          alert.addButton(this.translate.instant('CANCELAR'));
          alert.addButton({
            text: this.translate.instant('ACEPTAR'),
            handler: data => {
              let loader = this.loadingCtrl.create({
                content: this.translate.instant('ENVIANDO_DATOS'),
              });
              loader.present();
              console.log('Checkbox data:', data);
              this.notifier.sendNotification('Educadroid: ' + this.translate.instant('NUEVO_CUESTIONARIO'), data.toString(), { 'idEncuesta': encuesta.id.toString() })
                .subscribe(
                  res => console.log(res),
                  error =>console.error(error),
                  ()=>loader.dismiss()
              );
            }
          });

        } else {
          alert.setTitle(this.translate.instant('NO_POSEE_CURSOS'));
          alert.addButton('OK');
        }

        alert.present();

      },
      error => console.log(error)
    );


  }

}

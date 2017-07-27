import { AlertController } from 'ionic-angular';
import { Diagnostic } from '@ionic-native/diagnostic';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { Geolocation } from '@ionic-native/geolocation';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the GeolocalizacionProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class GeolocalizacionProvider {

  constructor(
    private diagnostic: Diagnostic,
    private androidPermissions: AndroidPermissions,
    private geoLocation: Geolocation,
    private alertCtrl: AlertController
  ) { }

  private setCurrentPosition() {
    let direccion_cords = {
      latitud: 0,
      longitud: 0
    }

    this.geoLocation.getCurrentPosition().then((position) => {
      direccion_cords.latitud = position.coords.latitude;
      direccion_cords.longitud = position.coords.longitude;
      localStorage.setItem('educadroid_coords', JSON.stringify(direccion_cords));
    }).catch((error) => {
      console.log('Error getting location', error);
    });

  }
  getLocalizacion() {
    this.diagnostic.isLocationAvailable().then(
      () => this.diagnostic.isLocationAuthorized().then(
        () => {
          console.log('Localizacion autorizada');
          this.diagnostic.isLocationEnabled().then(
            (status) => {
              if (status === true) {
                this.setCurrentPosition();
              } else {
                console.log('GPS esta desactivado');
                this.showPromptLocalizacion();
              }
           }
          )
        },
        () => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION).then(
          () => this.setCurrentPosition(),
          () => console.log('Permiso para geolocalizacion denegado por el usuario')
        )
      ),
      () => console.log('Localizacion no disponible')
    )
  }
  private showPromptLocalizacion() {
    let alertPrompt = this.alertCtrl.create({
      title: 'Atención',
      message: 'Esta aplicación necesita la Geolocalización GPS',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.diagnostic.switchToLocationSettings();
            this.setCurrentPosition();
          }
        },
        {
          text: 'EN OTRO MOMENTO',
          handler: () => {
            console.log('usuario denegó gps');
          }
        }
      ]
    });
    alertPrompt.present();
  }

}

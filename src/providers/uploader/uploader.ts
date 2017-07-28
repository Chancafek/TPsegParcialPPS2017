import { Transfer, FileUploadOptions, TransferObject } from '@ionic-native/transfer';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the UploaderProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UploaderProvider {

  private userUrl = 'http://educadroid/users/'

  constructor(
    private transfer: Transfer
  ) {
    console.log('Hello UploaderProvider Provider');
  }

  uploadImage(id: any, img: any) {
    const fileTransfer: TransferObject = this.transfer.create();
    const currentUser = JSON.parse(localStorage.getItem('token_educadroid'));
      let options: FileUploadOptions = {
        fileKey: 'file',
        fileName: 'name.jpg',
        headers: {
          'Authorization': 'Bearer '+ currentUser
        }

      }

      fileTransfer.upload(img, `${this.userUrl}/${id}/upload`, options)
      .then((data) => {
        console.log('success');
      }, (err) => {
        console.log('error al subir')
      })
    }

}

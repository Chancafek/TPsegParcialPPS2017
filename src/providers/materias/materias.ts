import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

/*
  Generated class for the MateriasProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class MateriasProvider {

  // private url = 'http://educadroid.dev';
  private url = 'http://educadroid.kennychancafe.com';

  constructor(public http: Http) {
    // console.log('Hello MateriasProvider Provider');
  }

}

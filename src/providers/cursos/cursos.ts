import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, RequestOptions, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

/*
  Generated class for the CursosProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class CursosProvider {

  // private url = 'http://educadroid.dev';
  private url = 'http://educadroid.kennychancafe.com';

  constructor(public http: Http) {
    console.log('Hello CursosProvider Provider');
  }

  inscribirCurso(id:any, body: any) {
    let payLoad = {
      legajo: id,
      cursos: body
    }
    return this.http.post(`${this.url}/inscripciones`, payLoad, this.jwt())
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().message || 'Server Error'));

  }

  private jwt() {
    const currentUser = JSON.parse(localStorage.getItem('token_educadroid'));
      if (currentUser) {
        const headers = new Headers({ 'Authorization': 'Bearer ' + currentUser });
          return new RequestOptions({ headers: headers });
      }
  }

  listarCursos() {
    return this.http.get(`${this.url}/cursos`, this.jwt())
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().message || 'Server Error'));
  }

}

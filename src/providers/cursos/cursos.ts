import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Encuesta } from "../../models/encuesta";
import { Curso } from "../../models/curso";
import { Observable } from 'rxjs/Observable';
import { User } from "../../models/user";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

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

  baseUrl: string = window.location.protocol + "//localhost/api_educadroid/public/";
  //baseUrl: string = "http://educadroid.kennychancafe.com/";

  getAll(): Observable<any[]> {
    return this.http.get(this.baseUrl + "cursos")
      .map(response => response.json())
      .catch(this.handleError);
  }

  getByUser(user_id: Number): Observable<any[]> {
    return this.http.get(this.baseUrl + "cursos/" + user_id)
      .map(response => response.json())
      .catch(this.handleError);
  }


  private handleError(error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);

  }
  
  inscribirCurso(id: any, body: any) {
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

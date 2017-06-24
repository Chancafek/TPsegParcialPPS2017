import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Encuesta } from "../../models/encuesta";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

/*
  Generated class for the EncuestaProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class EncuestaProvider {

  baseUrl: string = window.location.protocol + "//localhost/api_educadroid/public/";
  //baseUrl: string = "http://lgferreyra.esy.es/ppsParcial/ws/public/";
  data: Encuesta[];

  constructor(public http: Http) {

  }

  getEncuestas(): Observable<Encuesta[]> {
    return this.http.get(this.baseUrl + "encuestas")
      .map(response => response.json() as Encuesta[])
      .catch(this.handleError);
  }

  saveEncuesta(encuesta: Encuesta): Observable<Response> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.baseUrl + "encuestas", encuesta, options)
      .catch(this.handleError);
  }

  deployEncuesta(encuesta: Encuesta, division: String, materia: String): Observable<Boolean> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.baseUrl + "encuestas/deploy/", encuesta, options)
      .map(response => response.ok);
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

}

import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Encuesta } from "../../models/encuesta";
import { Curso } from "../../models/curso";
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

  // private url = 'http://educadroid.dev';
  private url = 'http://educadroid.kennychancafe.com';

  baseUrl: string = 'http://educadroid.kennychancafe.com';
  //baseUrl: string = "??A DONDE LO SUBIMOS??";
  data: Encuesta[];

  constructor(public http: Http) {

  }

  getAll(): Observable<Encuesta[]> {
    return this.http.get(this.baseUrl + "encuestas")
      .map(response => response.json() as Encuesta[])
      .catch(this.handleError);
  }

  save(encuesta: Encuesta): Observable<Response> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.baseUrl + "encuestas", encuesta, options)
      .catch(this.handleError);
  }

  deploy(encuesta: Encuesta, curso: Curso): Observable<Response> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.baseUrl + "encuestas/deploy", { encuesta_id: encuesta.id, curso_id: curso.id }, options)
      .catch(this.handleError);
  }

  getById(id: Number): Observable<Encuesta> {
    return this.http.get(this.baseUrl + "encuestas/" + id)
      .map(response => response.json() as Encuesta)
      .catch(this.handleError);
  }

  saveResultados(encuesta: Encuesta, user_id: Number, resultados: Boolean[]): Observable<Response> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.baseUrl + "resultados", {
      preguntas: encuesta.preguntas, user_id: user_id == null ? 2 : user_id, resultados: resultados
    }, options)
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

}

import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Encuesta } from "../../models/encuesta";
import { Curso } from "../../models/curso";
import { Pregunta } from "../../models/pregunta";
import { Observable } from 'rxjs/Observable';
import { User } from "../../models/user";
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

  //baseUrl: string = 'http://educadroid.kennychancafe.com/';
  baseUrl: string = "http://localhost/api_educadroid/public/";
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

  deploy(encuesta_id: Number, curso_id_array: Number[]): Observable<Response> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.baseUrl + "encuestas/deploy", { encuesta_id: encuesta_id, curso_id_array: curso_id_array }, options)
      .catch(this.handleError);
  }

  getById(id: Number): Observable<Encuesta> {
    return this.http.get(this.baseUrl + "encuestas/" + id)
      .map(response => response.json() as Encuesta)
      .catch(this.handleError);
  }

  getByUser(user_id: Number): Observable<Encuesta[]> {
    return this.http.get(this.baseUrl + "encuestas/user/" + user_id.toString())
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

  deleteEncuesta(encuesta_id: Number): Observable<Response> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.delete(this.baseUrl + "encuestas/" + encuesta_id, options)
      .catch(this.handleError);
  }

  getPregunta(pregunta_id: Number): Observable<Pregunta> {
    return this.http.get(this.baseUrl + "preguntas/" + pregunta_id.toString())
      .map(response => response.json() as Pregunta)
      .catch(this.handleError);
  }

  savePregunta(pregunta: Pregunta, encuesta_id: Number): Observable<Number> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.baseUrl + "preguntas", { pregunta: pregunta, encuesta_id: encuesta_id }, options)
      .map(response => response.json() as Number)
      .catch(this.handleError);
  }

  deletePregunta(pregunta_id: Number){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.delete(this.baseUrl + "preguntas/" + pregunta_id.toString(), options)
      .map(response => response.json() as Number)
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

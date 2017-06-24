import { tokenNotExpired } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthProvider {

  private url = 'http://educadroid.dev';

  constructor(public http: Http) {}

  loggedIn() {
      return tokenNotExpired('token_educadroid');
  }

  attempt(user: any): Observable<any> {
    const body = { email: user.email, password: user.password };

    return this.http.post(`${this.url}/auth/attempt`, body, this.setHeaders())
      .map((response: Response) => {
        const res = response.json();
        if (res && res.token) {
          localStorage.setItem('token_educadroid', JSON.stringify(res.token));
        }
      })
      .catch((error: any) => Observable.throw(error.json().message || 'Server Error'));
  }

  logout() {
    localStorage.removeItem('token_educadroid');
  }

  private setHeaders() {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    return new RequestOptions({ headers: headers });
  }
}

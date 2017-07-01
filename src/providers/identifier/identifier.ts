import { User } from './../../models/user';
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { JwtHelper } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class IdentityProvider {

    jwtHelper: JwtHelper;

    // private url = 'http://educadroid.dev';
  private url = 'http://educadroid.kennychancafe.com';

    constructor(private http: Http) {
      this.jwtHelper = new JwtHelper();
    }

    getIdentity() {
        const token = localStorage.getItem('token_educadroid');
        if(token) {
          const decodedToken = this.jwtHelper.decodeToken(token);
          let subject = {
              id : decodedToken.user.id,
              nombre: decodedToken.user.nombre,
              apellido: decodedToken.user.apellido,
              email : decodedToken.user.email,
              role : decodedToken.role,
              sexo: decodedToken.user.sexo,
              image: decodedToken.user.image
          };
          return subject;
        } else {
          console.log('Error token no encontrado');
        }
    }

    getUserProfile(id?: any): Observable<User> {
        if (id == null || id === '') {
            // console.log('id from token: ' + this.getIdentity().id);
            id = this.getIdentity().id;
        }
        return this.http.get(`${this.url}/users/${id}`, this.jwt())
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

    isAlumno() {
      return this.getIdentity().role == 3;
    }

    isProfesor() {
      return this.getIdentity().role == 2;
    }

    isAdministrativo() {
      return this.getIdentity().role == 4;
    }

    isAdmin() {
      return this.getIdentity().role == 1;
    }

    isMale() {
      return this.getIdentity().sexo == 'm';
    }
}

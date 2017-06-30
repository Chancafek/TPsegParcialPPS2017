import { User } from './../../models/user';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UserProvider {

  private url = 'http://educadroid.dev'

  constructor(public http: Http) { }

  getUsers(): Observable<User[]> {
        return this.http.get(`${this.url}/users`, this.jwt())
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().message || 'Server Error'));
    }

    getUserByID(id: any): Observable<User> {
        return this.http.get(`${this.url}/users/${id}`, this.jwt())
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().message || 'Server Error'));
    }

    editUser(id: any, body: any): Observable<User> {
        return this.http.put(`${this.url}/users/${id}`, body,this.jwt())
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().message || 'Server Error'));
    }

    addUser(body: any): Observable<any> {
        return this.http.post(`${this.url}/users`, body, this.jwt())
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().message || 'Server Error'));
    }

    removeUser(id: any): Observable<any> {
        return this.http.delete(`${this.url}/users/${id}`, this.jwt())
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().message || 'Server Error'));
    }

    getUserByRol(id: any): Observable<User[]> {
        return this.http.get(`${this.url}/users/rol/${id}`, this.jwt())
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().message || 'Server Error'));
    }

    private jwt() {
        const currentUser = JSON.parse(localStorage.getItem('token_argenta'));
        if (currentUser) {
            const headers = new Headers({ 'Authorization': 'Bearer ' + currentUser });
            return new RequestOptions({ headers: headers });
        }
    }

}

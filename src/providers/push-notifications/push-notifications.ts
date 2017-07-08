import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

/*
  Generated class for the PushNotificationsProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class PushNotificationsProvider {

  private url: string = 'https://onesignal.com/api/v1/notifications';
  constructor(public http: Http) { }

  sendNotification(title: string, msg: string, extra?: any) {
    const datos = (extra) ? extra : {};
    const message = {
      app_id: "ab09245a-0262-4d50-9a12-c9c19c5391f4",
      data: datos,
      headings: {"en": "English heading", 'es': title},
      contents: {"en": "English Message", 'es': msg},
      included_segments: ["All"]
    };
    return this.http.post(`${this.url}`, message, this.setHeaders())
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json() || 'Server Error'));
  }

  private setHeaders() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    // headers.append("Authorization", "Basic NGEwMGZmMjItY2NkNy0xMWUzLTk5ZDUtMDAwYzI5NDBlNjJj");
    headers.append("Authorization", "Basic MGJjMGRhNWItZDBlMS00NjcyLTkyOWQtNzliYzVjMjRiZDIy");
    return new RequestOptions({ headers: headers });
  }

}

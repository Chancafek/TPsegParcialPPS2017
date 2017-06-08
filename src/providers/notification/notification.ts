import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Push, PushToken } from '@ionic/cloud-angular';

@Injectable()
export class NotificationProvider {
  private wsurl: string = 'https://api.ionic.io/push/notifications';
  private profile: string = 'educadroid';
  private apitoken: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJmMGIxZDE4Yi0zNzc1LTRiMzYtODgzYy1iOTcyODNhMTdkMmIifQ.lPlhO5zqbedEX3icPUjIUqvDF_Q7aqb4Ck4DiZq05Eo';
  private devicetoken: string;
  constructor(public http: Http, public push: Push) {
  }

  public registerToken() {
    this.push.register().then((t: PushToken) => {
      return this.push.saveToken(t,{
        ignore_user: true
      });
    }).then((t: PushToken) => {
      console.log('Token saved:', t.token);
      this.devicetoken = t.token;
    });
  }

  // se puede agregar en el lugar que se necesite
  public getNotifications() {
    this.push.rx.notification()
    .subscribe((msg) => {
      alert(msg.title + ': ' + msg.text);
    });
  }

  public postNotification(message: string) {
  	let body: any = {
      'tokens': [this.devicetoken],
      'profile': this.profile,
      'notification': {'message': message}
	};

	let headers: any = {
		'Content-Type': 'application/json',
		'Authorization': 'Bearer ' + this.apitoken
	};

  	return this.http.post(this.wsurl, body, {'headers': headers})
  		.toPromise().then(this.GetData).catch(this.Error);
  }

  private GetData(r: Response) {
  	return r.json() || {};
  }

  private Error(e: Response) {
  	return e;
  }
}

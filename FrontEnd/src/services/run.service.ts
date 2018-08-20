import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';

@Injectable()
export class RunService {

  constructor(private http: HttpClient) {
  }

  getEvents(serverURL, token) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token
      })
    };

    return this.http.get(serverURL + "/api/run/events", httpOptions)
      .map(res => {
        return JSON.parse(JSON.stringify(res));
      })
      .catch(err => {
        return Observable.throw('errorConexion');
      });
  }

  saveEvents(serverURL, token, event) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token
      })
    };

    return this.http.post(serverURL + "/api/run/events", event,
      httpOptions
    )
      .map(res => {
        return JSON.parse(JSON.stringify(res));
      })
      .catch(err => {
        return Observable.throw('errorConexion');
      });
  }

  deleteEvents(serverURL, token, id) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token
      })
    };

    return this.http.delete(serverURL + "/api/run/events/" + id,
      httpOptions
    )
      .map(res => {
        return JSON.parse(JSON.stringify(res));
      })
      .catch(err => {
        return Observable.throw('errorConexion');
      });
  }


  getScripts(serverURL, token) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token
      })
    };

    return this.http.get(serverURL + "/api/run/scripts", httpOptions)
      .map(res => {
        return JSON.parse(JSON.stringify(res));
      })
      .catch(err => {
        return Observable.throw('errorConexion');
      });
  }

  saveScript(serverURL, token, script) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token
      })
    };

    return this.http.post(serverURL + "/api/run/scripts", script,
      httpOptions
    )
      .map(res => {
        return JSON.parse(JSON.stringify(res));
      })
      .catch(err => {
        return Observable.throw('errorConexion');
      });
  }

  deleteScript(serverURL, token, id) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token
      })
    };

    return this.http.delete(serverURL + "/api/run/scripts/" + id,
      httpOptions
    )
      .map(res => {
        return JSON.parse(JSON.stringify(res));
      })
      .catch(err => {
        return Observable.throw('errorConexion');
      });
  }

  launchScript(serverURL, token, script) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token
      })
    };

    return this.http.post(serverURL + "/api/run/scripts/launch", script,
      httpOptions
    )
      .map(res => {
        return JSON.parse(JSON.stringify(res));
      })
      .catch(err => {
        return Observable.throw('errorConexion');
      });
  }

}

import {Injectable} from "@angular/core";
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';

@Injectable()
export class LookService {

  constructor(private http: HttpClient) {
  }
  
  cpu(serverURL, token, dateStart, dateEnd, actualInfo) {
    const httpOptions = {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin' : '*',
          'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
          'Accept':'application/json',
          'Content-Type':  'application/json',
          'Authorization': token
      })
    };

    return this.http.post(serverURL + "/api/look/cpu", { dateStart, dateEnd, actualInfo }, httpOptions)
      .map(res => {
        return JSON.parse(JSON.stringify(res));
      })
      .catch(err => {
        return Observable.throw('errorConexion');
      });
  }

  mem(serverURL, token, dateStart, dateEnd, actualInfo) {
    const httpOptions = {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin' : '*',
          'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
          'Accept':'application/json',
          'Content-Type':  'application/json',
          'Authorization': token
      })
    };

    return this.http.post(serverURL + "/api/look/mem", { dateStart, dateEnd, actualInfo }, httpOptions)
      .map(res => {
        return JSON.parse(JSON.stringify(res));
      })
      .catch(err => {
        return Observable.throw('errorConexion');
      });
  }

  process(serverURL, token, order, nProcess) {
    const httpOptions = {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin' : '*',
          'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
          'Accept':'application/json',
          'Content-Type':  'application/json',
          'Authorization': token
      })
    };

    return this.http.get(serverURL + "/api/look/processList/" + order + "/" + nProcess, httpOptions)
      .map(res => {
        return JSON.parse(JSON.stringify(res));
      })
      .catch(err => {
        return Observable.throw('errorConexion');
      });
  }

  status(serverURL, token) {
    const httpOptions = {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin' : '*',
          'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
          'Accept':'application/json',
          'Content-Type':  'application/json',
          'Authorization': token
      })
    };

    return this.http.get(serverURL + "/api/look/status", httpOptions)
      .map(res => {
        return JSON.parse(JSON.stringify(res));
      })
      .catch(err => {
        return Observable.throw('errorConexion');
      });
  }

  uptime(serverURL, token) {
    const httpOptions = {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin' : '*',
          'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
          'Accept':'application/json',
          'Content-Type':  'application/json',
          'Authorization': token
      })
    };

    return this.http.get(serverURL + "/api/look/uptime", httpOptions)
      .map(res => {
        return JSON.parse(JSON.stringify(res));
      })
      .catch(err => {
        return Observable.throw('errorConexion');
      });
  }
}

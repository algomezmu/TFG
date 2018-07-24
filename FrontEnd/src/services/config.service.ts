import {Injectable} from "@angular/core";
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';

@Injectable()
export class ConfigService {

  constructor(private http: HttpClient) {
  }
  
  config(serverURL, token) {
    const httpOptions = {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin' : '*',
          'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
          'Accept':'application/json',
          'Content-Type':  'application/json',
          'Authorization': token
      })
    };

    return this.http.get(serverURL + "/api/config", httpOptions)
      .map(res => {
        return JSON.parse(JSON.stringify(res));
      })
      .catch(err => {
        return Observable.throw('errorConexion');
      });
  }

  saveConfig(serverURL, token, config) {
      const httpOptions = {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin' : '*',
          'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
          'Accept':'application/json',
          'Content-Type':  'application/json',
          'Authorization': token
      })
    };

    return this.http.post(serverURL + "/api/config", config, 
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

import {Injectable} from "@angular/core";
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class LoginService {

  constructor(private http: HttpClient) {
  }
  
  login(serverURL, username, password) {
    console.log(serverURL);
    //const headers = new HttpHeaders();
    //headers.append('Content-Type', 'application/json');
    //headers.append('Access-Control-Allow-Origin', '*'); 
    var headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin' , '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append('Accept','application/json');
    headers.append('content-type','application/json');

    const body = JSON.stringify({ username: username, password: password });

    return this.http.post(serverURL + "/api/login", body, {
        headers: headers
      })
      .map(res => {
        return JSON.parse(JSON.stringify(res));
      })
      .catch(err => {
        return Observable.throw('errorConexion');
      });
  }
}

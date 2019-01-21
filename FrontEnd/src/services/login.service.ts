import {Injectable} from "@angular/core";
import { Observable } from 'rxjs/Rx'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class LoginService {

  constructor(private http: HttpClient) {
  }
  
  login(serverURL, username, password) {
    var headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin' , '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append('Accept','application/json');
    headers.append('content-type','application/json');

    let body = { username, password };

    return this.http.post(serverURL + "/api/login", body, {
        headers: headers
      })
      .map(res => {
        return JSON.parse(JSON.stringify(res));
      })
      .catch(err => {
        console.log(err);
        return Observable.throw(err.message);
      });
  }
}

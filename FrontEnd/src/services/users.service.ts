import {Injectable} from "@angular/core";
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';

@Injectable()
export class UsersService {

  constructor(private http: HttpClient) {
  }
  
  getUsers(serverURL, token) {
    const httpOptions = {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin' : '*',
          'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
          'Accept':'application/json',
          'Content-Type':  'application/json',
          'Authorization': token
      })
    };

    return this.http.get(serverURL + "/api/user", httpOptions)
      .map(res => {
        return JSON.parse(JSON.stringify(res));
      })
      .catch(err => {
        return Observable.throw('errorConexion');
      });
  }

  saveUser(serverURL, token, user) {
      const httpOptions = {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin' : '*',
          'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
          'Accept':'application/json',
          'Content-Type':  'application/json',
          'Authorization': token
      })
    };

    return this.http.post(serverURL + "/api/users", user, 
      httpOptions
      )
      .map(res => {
        return JSON.parse(JSON.stringify(res));
      })
      .catch(err => {
        return Observable.throw('errorConexion');
      });
  }


  deleteUser(serverURL, token, id) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
        'Accept':'application/json',
        'Content-Type':  'application/json',
        'Authorization': token
    })
  };

  return this.http.delete(serverURL + "/api/user/"+ id, 
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

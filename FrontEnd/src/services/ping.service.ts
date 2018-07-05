import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class PingService {
  constructor(public http: HttpClient) {
  }

  getPing(url) {
    var time = new Date().getMilliseconds();
    return this.http.get(url + '/api/ping').map(res => {
      var timeEnd = new Date().getMilliseconds();
      return (timeEnd-time);
    });
  }
}
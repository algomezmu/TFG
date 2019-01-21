import { Injectable } from '@angular/core';

@Injectable()
export class ShareDataService {
    public serverName: any;
    public serverDomain: any;
    public token: any;
    public tokenFCM: any;
    public fcmListener: any;
    constructor() { }
}

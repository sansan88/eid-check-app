import { Injectable } from '@angular/core';

import {
  HttpClient
} from '@angular/common/http';
import {
  Observable
} from 'rxjs';
import {
  map
} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class EidService {

  constructor(private http: HttpClient) { }


  public geteIDAuthorizationURL(isWeb) {
    const url = 'https://us-central1-eid-check.cloudfunctions.net/geteIDAuthorizationURL?web=' + JSON.stringify(isWeb);
    console.log("Call URL: " + url);
    return this.http.get(url);
  }

  public geteIDData(code, token, isWeb){
    return this.http.post('https://us-central1-eid-check.cloudfunctions.net/geteIDData',
    {
      authorization_code: code,
      token: token,
      isWeb: isWeb
    },{

    });
  }
}

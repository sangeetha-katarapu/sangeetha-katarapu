import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
// import { Headers } from '@angular/http';

import { Router } from '@angular/router'

import { Observable } from 'rxjs';

import { map } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient, private router: Router) { }
  // getDat1a(): Observable<any> {
  //   return this.http.get('')
  //     .map(response =>);
  // }
  

  // headers: HttpHeaders = new HttpHeaders({ 'X-Requested-With': 'XMLHttpRequest' });


  getArticles(): Observable<any> {

    return this.http.get('https://conduit.productionready.io/api/articles').pipe(
      map((response: any) => {
        // console.log("response",response)
        return response
      }),
    );
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Headers } from '@angular/http';

import { Router } from '@angular/router'

import { Observable } from 'rxjs';

import { map } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient, private router: Router) { }


  getCommonData(data: any) {

    return this.http.post(`/api/common/commonUrl`, data);
  }
  getUserData(data: any) {

    return this.http.post(`/api/common/users`, data);
  }
  login(userDetails: any) {
    return this.http.post(`/api/common/login`, userDetails);
  }

  
}

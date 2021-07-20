import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, BehaviorSubject } from 'rxjs'
import { Router } from '@angular/router'

import jwt_decode from 'jwt-decode'
export interface UserDetails {
  id: number
  first_name: string
  email: string
  password: string
  exp: number
  iat: number
}

@Injectable()
export class AuthenticationService {
  private token: string
  public role: string

  constructor(private http: HttpClient, private router: Router) { }

  public getToken(): string {
    this.token = sessionStorage.getItem('token')
    return this.token
  }

  public getUserDetails(): UserDetails {
    const token = this.getToken()
    if (token == undefined) {
      return null
    }
    let payload
    if (token) {
      payload = token.split('.')[1]
      payload = window.atob(payload)
      return JSON.parse(payload)
    } else {
      return null
    }
  }

  public isLoggedIn(): boolean {
    const user = this.getUserDetails()
    if (user) {
      console.log("in isLoggedIn if",user)
      return user.exp > Date.now() / 1000
    } else {
      console.log("in isLoggedIn else")
      return false
    }
  }

  public getSessionStorage(): void {
    this.token = sessionStorage.getItem('token')
    if (this.token == undefined) {
      return
    }
    const decodedData = jwt_decode(this.token)
    console.log("decoded", decodedData)
    sessionStorage.setItem('uname', decodedData['username']);
      sessionStorage.setItem('role', "1");
      this.role = "1"
    

  }

  public logout(): void {
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigateByUrl('/')

  }

private artID = new BehaviorSubject('');
  ArtIDInfo = this.artID.asObservable();

  modifyArtID(flag: any) {
    this.artID.next(flag)
  }


}

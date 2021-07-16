
import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError, pipe } from 'rxjs';
import { map, catchError } from "rxjs/operators";
import { AuthenticationService } from "./authentication.service";
import { LoaderService } from './loader.service';
import { tap } from 'rxjs/operators';

import { Router } from '@angular/router'
@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorsService implements HttpInterceptor {

  constructor(private injector: Injector, private router: Router, private loaderService: LoaderService) { }

  handleError(error: HttpErrorResponse) {
    console.log("Error Occured!")
    return throwError(error);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<any> {
    //console.log("req", req)
    this.showLoader();
    var appService = this.injector.get(AuthenticationService)
    const headers = new HttpHeaders({
      // 'Authorization': `${appService.getToken()}`,
      'X-Requested-With': 'XMLHttpRequest'
    });

    const clone = req.clone({
      headers: headers
    });
    return next.handle(clone)
      .pipe(
        map((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            event = event.clone({ body: this.modifyBody(event.body) });
            if (event.body.statusCode == 515) {
              console.log("Error is ", event.body);
            }
            this.onEnd();
          }
          return event;
        }),
        catchError(this.handleError)
      );
  }

  private modifyBody(body: any) {
    return body
  }

  private onEnd(): void {
    this.hideLoader();
  }

  private showLoader(): void {
    this.loaderService.show();
  }

  private hideLoader(): void {
    this.loaderService.hide();
  }

}

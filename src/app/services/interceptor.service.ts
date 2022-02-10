import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
  token="";
  constructor() {
    this.token=localStorage.getItem('Token')||'{}';
   }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.token=localStorage.getItem('Token')||'{}';
    const headers = new HttpHeaders({
      authorization: `Bearer ${ this.token }`
    });

    const reqClone = req.clone({
      headers
    })
    return next.handle ( reqClone ).pipe(
      catchError (this.handlerError)
    );
  }
  handlerError (error :HttpErrorResponse){
      return throwError(error);
  }
}

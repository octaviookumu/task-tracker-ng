import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CommonInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const API_KEY = 'API1234'
    const ROLE = 'Admin'
    // const CONTENT_TYPE = 'application/json'

    // clone means copy the existing request and modify it
    return next.handle(request.clone({
      setHeaders: {
        API_KEY,
        ROLE,
        // CONTENT_TYPE
      }
    }));
  }
}

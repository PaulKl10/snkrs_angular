import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('authToken');

    if (token) {
      let authReq = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + token)
        })
        console.log(authReq);
        return next.handle(authReq);
    } else {
      // Si aucun token, laisse la requête passer telle quelle
      return next.handle(request);
    }
  }
}

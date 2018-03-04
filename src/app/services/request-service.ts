import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';

@Injectable()
export class RequestOptionsInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      let withCredentials = true;
      if (request.url.includes('blockchain.info')) {
        withCredentials = false;
      }
    request = request.clone({
      withCredentials
    });
    return next.handle(request);
  }
}

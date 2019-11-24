import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { projectsMock } from '../mock/projects.mock';

const urls = [
  {
    url: '/projects',
    json: projectsMock
  },
];

@Injectable()
export class HttpMockRequestInterceptor implements HttpInterceptor {
  constructor() {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    for (const element of urls) {
      if (request.url === element.url) {
        console.log('Loaded from json : ' + request.url);
        return of(new HttpResponse({status: 200, body: (element.json)}));
      }
    }
    console.log('Loaded from http call :' + request.url);
    return next.handle(request);
  }
}

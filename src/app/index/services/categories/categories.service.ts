import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';

export interface CategoryInterface {
  id?: number;
}

@Injectable()
export class CategoriesService {

  constructor(
    protected httpClient: HttpClient,
  ) {
  }


  public getCategories(): Observable<HttpEvent<Array<CategoryInterface>>> {
    const url = '/categories';
    const request = new HttpRequest('GET', url);
    return this.httpClient.request<Array<CategoryInterface>>(request);
  }

}

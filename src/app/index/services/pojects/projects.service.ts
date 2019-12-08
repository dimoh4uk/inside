import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ProjectInterface {
  id?: number;
  videos: Array<any>;
  name: string;
  location: string;
  description: string;
}

@Injectable()
export class ProjectsService {

  constructor(
    protected httpClient: HttpClient,
  ) {
  }


  public getProjects(): Observable<HttpEvent<Array<ProjectInterface>>> {
    const url = '/projects';
    const request = new HttpRequest('GET', url);
    return this.httpClient.request<Array<ProjectInterface>>(request);
  }
}

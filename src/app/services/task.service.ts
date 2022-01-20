import { Injectable } from '@angular/core';
import { Task } from '../Task';
// import { TASKS } from '../mock-tasks';

import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://localhost:5000/tasks';

  constructor(private http: HttpClient) {}

  // Httpclient returns an observable outomatically
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  // getTasks(): Task[] {
  //   return TASKS;
  // }
}

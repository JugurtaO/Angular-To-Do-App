import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../Models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private httpClient: HttpClient) { }

  private baseURL = "http://localhost:8080/tasks";

  getAllTasks(): Observable<Task[]> {


    return this.httpClient.get<Task[]>(`${this.baseURL}`);
  }
 
}

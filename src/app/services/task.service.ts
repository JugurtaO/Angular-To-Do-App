import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../Models/task';
import { UpdateTaskDTO } from '../Models/update-task-dto';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private httpClient: HttpClient) { }

  private baseURL = "http://localhost:8080/tasks";

  public  getAllTasks(): Observable<Task[]> {


    return this.httpClient.get<Task[]>(`${this.baseURL}`);
  }
 
  public getTaskById(task_id:number):Observable<Task>{
    return this.httpClient.get<Task>(`${this.baseURL}/${task_id}`);
  }

  public deleteTask(id:number):Observable<String>{
    //the request body is empty in this case
    return this.httpClient.post(`${this.baseURL}/${id}/delete`,null,{responseType: 'text' });  
  }
  public addTask(task:Task):Observable<String>{
    //the request body is empty in this case
    return this.httpClient.post(`${this.baseURL}/add`,task,{responseType: 'text' });  
  }

  public updateTask(id:number,newTask:UpdateTaskDTO):Observable<String>{
    return this.httpClient.post(`${this.baseURL}/${id}/update`,newTask,{responseType:'text'});
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { Task } from '../Models/task';
import { UpdateTaskDTO } from '../Models/update-task-dto';
import { NodeWithI18n } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private httpClient: HttpClient) { }

  private baseURL = "http://localhost:8080/tasks";

  public  getAllTasks(): Promise<Task[]> {
    return firstValueFrom( this.httpClient.get<Task[]>(`${this.baseURL}`) );
  }
 
  public getTaskById(task_id:number):Promise<Task>{
    return firstValueFrom(this.httpClient.get<Task>(`${this.baseURL}/${task_id}`));
  }

  public deleteTask(id:number):Promise<String>{
    //the request body is empty in this case
    return firstValueFrom(this.httpClient.post(`${this.baseURL}/${id}/delete`,null,{responseType: 'text' }));  
  }
  public addTask(task:Task):Promise<String>{
    //the request body is empty in this case
    return firstValueFrom(this.httpClient.post(`${this.baseURL}/add`,task,{responseType: 'text' }));  
  }

  public updateTask(id:number,newTask:UpdateTaskDTO):Promise<String>{
    return firstValueFrom(this.httpClient.post(`${this.baseURL}/${id}/update`,newTask,{responseType:'text'}));
  }

}

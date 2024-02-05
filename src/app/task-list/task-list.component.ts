import { Component, OnInit } from '@angular/core';
import { Task } from '../Models/task';
import { NgFor } from '@angular/common';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [NgFor],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit {
  
  tasks: Task[]=[];
  constructor(private taskService:TaskService){}
  ngOnInit(): void {
    this.getTasks();
  }

  private getTasks(){
    //asynchronus call
    this.taskService.getAllTasks().subscribe(data=>{
      this.tasks=data;
      console.log(">>>>>>>",data);
    })
  }
}

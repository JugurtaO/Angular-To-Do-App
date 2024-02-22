import { AfterViewInit, Component, OnInit, computed, numberAttribute, signal } from '@angular/core';
import { Task } from '../Models/task';
import { NgFor } from '@angular/common';
import { TaskService } from '../services/task.service';
import { Router, RouterOutlet } from '@angular/router';
import { AddTaskComponent } from '../add-task/add-task.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { MatIcon } from '@angular/material/icon';


@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [NgFor,RouterOutlet,AddTaskComponent,NavbarComponent,MatIcon],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit  {
  



  constructor(private taskService: TaskService, private router:Router ) { }

  public tasks:Task[]=[] ;
  ngOnInit(): void {
    this.getTasks();
  }

  public getTasks() {
    //asynchronus call
    this.taskService.getAllTasks().subscribe(data => {
      this.tasks=data;
      //inverser les tâches pour afficher les plus récentes en  premier
      this.tasks.reverse()
    })
  }



  public deleteTask(id: number) {
    //notify the backend and delete the requested task
    this.taskService.deleteTask(id).subscribe(data=>{
      //Then update current tasks list
      this.getTasks();
    });
  }

//navigate to update task page
  public updateTask(id:number){
    this.router.navigate([`/tasks/${id}/update`])
  }

  public viewTask(id:number){
    this.router.navigate([`/tasks/${id}`]);
  }



 

}
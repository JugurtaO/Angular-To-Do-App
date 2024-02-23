import {  Component, OnInit, computed, numberAttribute, signal } from '@angular/core';
import { Task } from '../Models/task';
import { NgFor } from '@angular/common';
import { TaskService } from '../services/task.service';
import { Router, RouterOutlet } from '@angular/router';
import { AddTaskComponent } from '../add-task/add-task.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { MatIcon } from '@angular/material/icon';
import { ButtonModule } from 'primeng/button';
import { CarouselModule, } from 'primeng/carousel';
import { CardModule } from 'primeng/card';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { BadgeModule } from 'primeng/badge';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [NgFor, RouterOutlet, AddTaskComponent, NavbarComponent, MatIcon,CarouselModule,ButtonModule,CardModule,BadgeModule,ConfirmPopupModule,ToastModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
  providers:[ConfirmationService,MessageService]
})
export class TaskListComponent implements OnInit {




  constructor(private taskService: TaskService, private router: Router,private confirmationService: ConfirmationService, private messageService: MessageService) { }

  public tasks: Task[] = [];
  ngOnInit(): void {
    this.getTasks();
  }

  public getTasks() {
    //asynchronus call
    this.taskService.getAllTasks().subscribe(data => {
      this.tasks = data;
      //inverser les tâches pour afficher les plus récentes en  premier
      this.tasks.reverse()
    })
  }



  public deleteTask(id: number) {
    //notify the backend and delete the requested task
    this.taskService.deleteTask(id).subscribe(data => {
      //Then update current tasks list
      this.getTasks();
    });
  }

  //navigate to update task page
  public updateTask(id: number) {
    this.router.navigate([`/tasks/${id}/update`])
  }

  public viewTask(id: number) {
    this.router.navigate([`/tasks/${id}`]);
  }





  confirmDeleteTask(event:Event,task:Task) {
    this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Do you want to delete this task?',
        icon: 'pi pi-info-circle',
        acceptButtonStyleClass: 'p-button-danger p-button-sm',
        accept: () => {           
            this.deleteTask(task.id);
            this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: `task n°${task.id} successfully deleted`, life: 3000 });
        },
        reject: () => {
            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        }
    });
}

}
import { Component, OnInit, computed, signal } from '@angular/core';
import { Task } from '../Models/task';
import { NgFor, NgIf } from '@angular/common';
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
import { DialogModule } from 'primeng/dialog';
import { provideNativeDateAdapter } from '@angular/material/core';
import { UpdateTaskComponent } from '../update-task/update-task.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CalendarModule } from "primeng/calendar";
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { MatChipsModule } from '@angular/material/chips';
@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [NgFor, NgIf, RouterOutlet, AddTaskComponent, NavbarComponent, MatIcon,
    CarouselModule, ButtonModule, CardModule, BadgeModule, ConfirmPopupModule,
    ToastModule, DialogModule, UpdateTaskComponent, MatInputModule, MatFormFieldModule,
    MatDatepickerModule, CalendarModule, NgxMaterialTimepickerModule, MatChipsModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
  providers: [ConfirmationService, MessageService, provideNativeDateAdapter()]
})

export class TaskListComponent implements OnInit {




  constructor(private taskService: TaskService, private router: Router, private confirmationService: ConfirmationService, private messageService: MessageService) { }

  public tasks: Task[] = [];
  public selectedTaskToUpdate: Task = new Task();

  //two primary signals<number>
  private inProgressBadge = signal<number>(0);
  private doneBadge = signal<number>(0);

  //two calculated signals <string> that contain the correpsonding string of the number of in progress and done badges
  readonly inProgressBadgeStr = computed<string>(() => this.inProgressBadge().toString());
  readonly doneBadgeStr = computed<string>(() => this.doneBadge().toString());





  ngOnInit(): void {
    this.getTasks();

  }


  public async getTasks(): Promise<void> {
    //Reset badges values
    this.inProgressBadge.set(0);
    this.doneBadge.set(0);

    //asynchronus call
    this.tasks = await this.taskService.getAllTasks();


    //inverser les tâches pour afficher les plus récentes en  premier
    this.tasks.reverse()
    this.tasks.forEach(task => task.status == "IN_PROGRESS" ? this.inProgressBadge.update(v => v + 1) : this.doneBadge.update(v => v + 1));

  }



  public deleteTask(id: number) {
    //notify the backend and delete the requested task
    this.taskService.deleteTask(id).then(data => {
      //Then update current tasks list
      this.getTasks();
    }).catch(err => console.log("[deleteTask] Error : ", err));
  }

  //navigate to update task page
  public updateTask(id: number) {
    this.router.navigate([`/tasks/${id}/update`])
  }

  public viewTask(id: number) {
    this.router.navigate([`/tasks/${id}`]);
  }





  confirmDeleteTask(event: Event, task: Task) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this task?',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-sm',
      accept: () => {
        //delete requested task
        this.deleteTask(task.id);
        //then display dialogConfirmation message
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: `task n°${task.id} successfully deleted`, life: 3000 });
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
      }
    });
  }


  //utils of udpate task dialog (pop up)
  visible: boolean = false;

  showDialog(taskToUpdate: Task) {
    this.selectedTaskToUpdate = taskToUpdate;
    this.visible = true;
  }



}
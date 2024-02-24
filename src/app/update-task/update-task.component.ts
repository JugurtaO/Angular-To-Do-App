import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../Models/task';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../services/task.service';
import {  Router } from '@angular/router';
import { UpdateTaskDTO } from '../Models/update-task-dto';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CalendarModule } from "primeng/calendar";
import { provideNativeDateAdapter } from '@angular/material/core';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-update-task',
  standalone: true,
  imports: [FormsModule, MatDatepickerModule, MatInputModule, CalendarModule, NgxMaterialTimepickerModule, MatFormFieldModule, CardModule],
  templateUrl: './update-task.component.html',
  styleUrl: './update-task.component.css',
  providers: [provideNativeDateAdapter()]
})
export class UpdateTaskComponent implements OnInit {

  constructor(private taskService: TaskService, private router: Router) { }

  @Input({ required: true })
  taskInput!: Task;


  newTask!: UpdateTaskDTO;
  id!: number;
  public dueDate: string = '';
  public time: string = '';
  
  ngOnInit(): void {
    this.newTask = new UpdateTaskDTO();
    this.id = this.taskInput.id;


  }

  updateTask(id: number) {
    if (this.newTask.newText == null || this.newTask.newText == "") {
      window.prompt("new task should not be empty !");
      return

    }
    //replace the default 00:00 time by the correct selected user time
    this.dueDate = this.dueDate.split(' ')[0] + ` ${this.time}`;

    //assign the dueDate to the task
    this.newTask.newDueDate = this.dueDate;


    this.newTask.newText = this.taskInput.text;
    this.taskService.updateTask(id, this.newTask).subscribe(data => { /*Nothing todo with returned data*/ });
    this.router.navigate(['/tasks']);
  }



  // It formates given date of dd/mm/yyyy format and returns a string date of yyyy-mm-dd format 
  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  }

  //EvenListenner that changes the date when the user finishes its date selection
  changeDate($event: any) {

    this.dueDate = this.formatDate($event.target.value);
  }

  //EvenListenner that changes the date when the user finishes its time selection
  changeTime(selectedTime: string) {
    this.time = selectedTime;

  }



}

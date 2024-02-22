import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Task } from '../Models/task';
import { FormsModule, NgModel } from '@angular/forms';
import { User } from '../Models/user';
import { TaskService } from '../services/task.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CalendarModule } from "primeng/calendar"; 

import {provideNativeDateAdapter} from '@angular/material/core';
import { ContentObserver } from '@angular/cdk/observers';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [RouterOutlet, FormsModule, MatFormFieldModule, MatInputModule, MatDatepickerModule,CalendarModule],
  providers:[provideNativeDateAdapter()],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css',

})
export class AddTaskComponent implements OnInit {
  
  dueDate: Date=new Date();


  //the author id is normaly retrieven from the current session.Here I'll retrieve it from input value until i implement user authentication 
  public currentUser = new User();
  public task: Task = new Task();

  constructor(private taskService: TaskService,
    private router: Router) { }
  ngOnInit(): void {
    this.currentUser.id = 20; //Lucas 
    this.task.author = this.currentUser;
  }

  public addTask(task: Task): void {
    if (task.text == null || task.text == "") {
      window.alert("task should not be empty !");
      return

    }
  
    //assign the dueDate to the task
    this.task.dueDate= this.getFormattedDate(this.dueDate);

    //save task
    console.log(">>> date before SAVE:",this.task.dueDate);

    // this.taskService.addTask(task).subscribe(data => { console.log(data) });
    // this.router.navigate(["/tasks"]);
  };

 getFormattedDate(now:Date): Date {
    

    const year: number = now.getFullYear();
    const month: number = now.getMonth() + 1;
    const day: number = now.getDate();
    const hours: number = now.getHours();
    const minutes: number = now.getMinutes();

    // Ensure two-digit representation for month, day, hour, and minute
    const monthStr: string = (month < 10 ? '0' : '') + month;
    const dayStr: string = (day < 10 ? '0' : '') + day;
    const hoursStr: string = (hours < 10 ? '0' : '') + hours;
    const minutesStr: string = (minutes < 10 ? '0' : '') + minutes;

    // Create a formatted date string in "yyyy-mm-dd hh:mm" format
    const formattedDateString: string = `${year}-${monthStr}-${dayStr} ${hoursStr}:${minutesStr}`;

    // Create a Date object from the formatted string
    const formattedDate: Date = new Date(formattedDateString.replace('T', ' '));

    return formattedDate;
}
}

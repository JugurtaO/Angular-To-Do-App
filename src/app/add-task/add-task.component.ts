import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Task } from '../Models/task';
import { FormsModule } from '@angular/forms';
import { User } from '../Models/user';
import { TaskService } from '../services/task.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CalendarModule } from "primeng/calendar";

import { provideNativeDateAdapter } from '@angular/material/core';
@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [RouterOutlet, FormsModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, CalendarModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css',

})
export class AddTaskComponent implements OnInit {

  public dueDate:string='';


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
    this.task.dueDate = this.dueDate;

    //save task

    this.taskService.addTask(task).subscribe(data => { console.log(data) });
    this.router.navigate(["/tasks"]);
  };

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  }
  changeDate($event: any) {
  
    this.dueDate=this.formatDate($event.target.value);
  }
  
}

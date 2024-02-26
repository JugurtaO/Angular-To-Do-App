import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Task } from '../Models/task';
import { FormsModule } from '@angular/forms';
import { User } from '../Models/user';
import { TaskService } from '../services/task.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CalendarModule } from "primeng/calendar";
import { CardModule } from 'primeng/card';
import { provideNativeDateAdapter } from '@angular/material/core';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { STATUS } from '../status';
@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [RouterOutlet, FormsModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, CalendarModule, CardModule, NgxMaterialTimepickerModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css',

})
export class AddTaskComponent implements OnInit {

  public dueDate: string = '';
  public time: string = '';


  public currentUser = new User();
  public task: Task = new Task();

  constructor(private taskService: TaskService,
    private router: Router) { }

  ngOnInit(): void {
    //In comming days, the user id will be retrived from the token  of the authenticated user (current user) but for tests I decided tp set it to 20 as lucas user id
    this.currentUser.id = 20; //Lucas 
    this.task.author = this.currentUser;
  }

  public addTask(task: Task): void {
    if (task.text == null || task.text == "") {
      window.alert("task should not be empty !");
      return

    }


    //replace the default 00:00 time by the correct selected user time
    this.dueDate=this.dueDate.split(' ')[0]+` ${this.time}`;

    //The status is by default IN_PROGRESS 
    this.task.status=STATUS.IN_PROGRESS;
    console.log(">>>",this.task.status);

    //assign the dueDate to the task
    this.task.dueDate = this.dueDate;

   



    //save task

    this.taskService.addTask(task).subscribe(data => { console.log(data) });
    this.router.navigate(["/tasks"]);
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
  changeTime(selectedTime:string) {
    this.time = selectedTime;
  
  }

  

}

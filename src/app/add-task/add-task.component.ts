import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Task } from '../Models/task';
import { FormsModule} from '@angular/forms';
import { User } from '../Models/user';
import { TaskService } from '../services/task.service';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [RouterOutlet, FormsModule,MatFormFieldModule, MatInputModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css',

})
export class AddTaskComponent implements OnInit {

  //the author id is normaly retrieven from the current session.Here I'll retrieve it from input value until i implement user authentication 
  public currentUser = new User();
  public task: Task = new Task();
  constructor(private taskService: TaskService,
            private router:Router) { }
  ngOnInit(): void {
    this.currentUser.id = 20; //Lucas 
    this.task.author = this.currentUser;
  }

  public addTask(task: Task): void {
    if (task.text == null || task.text == "") {
      window.prompt("task should not be empty !");
      return 

    }
    this.taskService.addTask(task).subscribe(data=>{console.log(data)});
    this.router.navigate(["/tasks"]);
  };
}

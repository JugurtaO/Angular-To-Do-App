import { Component, OnInit } from '@angular/core';
import { Task } from '../Models/task';
import { TaskService } from '../services/task.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-task',
  standalone: true,
  imports: [],
  templateUrl: './view-task.component.html',
  styleUrl: './view-task.component.css'
})
export class ViewTaskComponent implements OnInit {

  constructor(private taskService:TaskService, private activatedRoute:ActivatedRoute){}
  task!:Task;
  id!:number;
  ngOnInit(): void {
    this.task=new Task();
    //get task id from the current url in order to fetch it from the server and display it in the vue
    this.id=this.activatedRoute.snapshot.params['id'];
    this.taskService.getTaskById(this.id).subscribe(data=>{
      this.task=data;
    })
    
  }


}

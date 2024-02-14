import { Component, OnInit } from '@angular/core';
import { Task } from '../Models/task';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../services/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UpdateTaskDTO } from '../Models/update-task-dto';

@Component({
  selector: 'app-update-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update-task.component.html',
  styleUrl: './update-task.component.css'
})
export class UpdateTaskComponent implements OnInit {

  constructor(private taskService: TaskService, private activatedRoute: ActivatedRoute, private router:Router) { }
  task!: Task;
  newTask!:UpdateTaskDTO;
  id!: number;
  ngOnInit(): void {
    this.task = new Task();
    this.newTask=new UpdateTaskDTO();
    //get task id from the url path (params)
    this.id = this.activatedRoute.snapshot.params['id'];
    //get correponding task in order to populate its data to the vue (it is more confortable to update something knowing its old value)
    this.taskService.getTaskById(this.id).subscribe(data => {
      this.task = data;
    });

  }

  updateTask(id:number) {
    if (this.task.text == null || this.task.text == "") {
      window.prompt("new task should not be empty !");
      return 

    }
    this.newTask.newText=this.task.text;
    this.taskService.updateTask(id,this.newTask).subscribe(data=>{

    });
    this.router.navigate(['/tasks']);
  }


  
}

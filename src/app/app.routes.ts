import { Routes } from '@angular/router';
import { TaskListComponent } from './task-list/task-list.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { UpdateTaskComponent } from './update-task/update-task.component';
import { ViewTaskComponent } from './view-task/view-task.component';

export const routes: Routes = [
    {
        path:"tasks",
        component:TaskListComponent
    },
    {
        path:"add",
        component:AddTaskComponent
    },
    {
        path:"",redirectTo:"tasks",pathMatch:"full"
    },{
        path:"tasks/:id/update",
        component:UpdateTaskComponent
    },{
        path:"tasks/:id",
        component:ViewTaskComponent
    }

];

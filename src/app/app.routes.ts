import { Routes } from '@angular/router';
import { TaskListComponent } from './task-list/task-list.component';
import { AddTaskComponent } from './add-task/add-task.component';

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
    }

];

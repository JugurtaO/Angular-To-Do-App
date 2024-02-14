import { Routes } from '@angular/router';
import { TaskListComponent } from './task-list/task-list.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { UpdateTaskComponent } from './update-task/update-task.component';
import { ViewTaskComponent } from './view-task/view-task.component';
import { SignupLoginComponent } from './signup-login/signup-login.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {
        path: "tasks",
        component: TaskListComponent,
        title: "TODO | tasks"
    },
    {
        path: "add",
        component: AddTaskComponent,
        title: "TODO | create"
    },
    {
        path: "tasks/:id/update",
        component: UpdateTaskComponent,
        title: "TODO | edit"
    }, {
        path: "tasks/:id",
        component: ViewTaskComponent,
        title: "TODO | view"
    }, {
        path: "signup",
        component: SignupLoginComponent,
        title: "TODO | signup"
    }, {
        path: "login",
        component: SignupLoginComponent,
        title: "TODO | login"
    },{
        path:"home",
        component:HomeComponent,
        title:"TODO | home"
    },
    {
        path:"",
        redirectTo:"home",
        pathMatch:'full'
        
        
    }
];

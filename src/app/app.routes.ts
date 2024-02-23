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
        title: "TODO | Tasks"
    },
    {
        path: "add",
        component: AddTaskComponent,
        title: "TODO | New task"
    },
    {
        path: "tasks/:id/update",
        component: UpdateTaskComponent,
        title: "TODO | Edit"
    }, {
        path: "tasks/:id",
        component: ViewTaskComponent,
        title: "TODO | View"
    }, {
        path: "signup",
        component: SignupLoginComponent,
        title: "TODO | Signup"
    }, {
        path: "login",
        component: SignupLoginComponent,
        title: "TODO | Login"
    },{
        path:"home",
        component:HomeComponent,
        title:"TODO | Home"
    },
    {
        path:"",
        redirectTo:"home",
        pathMatch:'full'
        
        
    }
];

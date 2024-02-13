import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { TaskListComponent } from './task-list/task-list.component';
import { HttpClientModule } from '@angular/common/http';
import { TaskService } from './services/task.service';
import { AddTaskComponent } from './add-task/add-task.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,RouterOutlet,RouterLink,RouterLinkActive,HttpClientModule,NavbarComponent,TaskListComponent,AddTaskComponent,FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers:[TaskService]
})
export class AppComponent {
  title = 'to-do-frontend';
}

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { TaskListComponent } from './task-list/task-list.component';
import { HttpClientModule } from '@angular/common/http';
import { TaskService } from './services/task.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HttpClientModule,NavbarComponent,TaskListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers:[TaskService]
})
export class AppComponent {
  title = 'to-do-frontend';
}

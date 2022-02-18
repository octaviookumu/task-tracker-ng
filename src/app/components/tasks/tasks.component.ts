import { Component, OnInit } from '@angular/core';
import { Task } from '../../Task';
import { TaskService } from '../../services/task.service';
import { Observable, pipe, take } from 'rxjs';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {

  tasks$ : Observable<Task[]> = new Observable<Task[]> ()
  taskToChild!: Task;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    // fires off right away
    this.getTasks()
  }

  getTasks() {
    this.tasks$ = this.taskService.getTasks();
  }

  deleteTask(task: Task) {
    this.taskService.deleteTask(task)
      .pipe(
        take(1)
      )
      .subscribe((task) => {
        console.log("DELETED", task)
        this.getTasks()
      });
  }

  toggleReminder(task: Task) {
    task.reminder = !task.reminder;
    this.taskService.updateTaskReminder(task).subscribe()
  }

  addTask(task: Task) {
    this.taskService.addTask(task)
    .pipe(
        take(1)
      )
      .subscribe((task) => {
        console.log("ADDED", task)
        this.getTasks()
      })
  }

  receiveInParent(task: Task) {
    this.taskToChild = task;
  }
}

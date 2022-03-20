import { Component, OnInit } from '@angular/core';
import { Task } from '../../Task';
import { TaskService } from '../../services/task.service';
import { Observable, pipe, Subject, take, takeUntil } from 'rxjs';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {

  tasks$ : Observable<Task[]> = new Observable<Task[]> ()
  taskToChild!: Task;
  destroy$ = new Subject<any>()

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
        takeUntil(this.destroy$)
      )
      .subscribe((task) => {
        console.log("DELETED", task)
        this.getTasks()
      });
  }

  toggleReminder(task: Task) {
    task.reminder = !task.reminder;
    // this.taskService.updateTaskReminder(task).subscribe()
    this.taskService.updateTaskReminder(task)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.getTasks()
      })
  }

  addTask(task: Task) {
    this.taskService.addTask(task)
    .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe((task) => {
        console.log("ADDED", task)
        this.getTasks()
      })
  }

  receiveInParent(task: Task) {
    this.taskToChild = task;
  }

  ngOnDestroy() {
    this.destroy$.next(true)
  }
  
}

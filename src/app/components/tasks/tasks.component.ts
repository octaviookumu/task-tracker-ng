import { Component, OnInit } from '@angular/core';
import { Task } from '../../Task';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];
  taskToChild!: Task;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    // fires off right away
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });

    // this.tasks = this.taskService.getTasks()
  }

  deleteTask(task: Task) {
    this.taskService.deleteTask(task).subscribe(() => {
      this.tasks = this.tasks.filter((t) => t.id !== task.id);
    });
  }

  toggleReminder(task: Task) {
    task.reminder = !task.reminder;
    this.taskService.updateTaskReminder(task).subscribe()
  }

  addTask(task: Task) {
    this.taskService.addTask(task).subscribe((task) => this.tasks.push(task))
  }

  receiveInParent(task: Task) {
    // console.log("IN PARENT", task)
    this.taskToChild = task;
    return task;
  }


}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../Task';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // BehaviorSubject ensures every component consuming the service receives the most recent up-to-date data
  // holds the current value of the task
  private taskSource = new BehaviorSubject<Task>(
    {
      id: 99,
      text: 'Pass data to children',
      day: 'Feb 15th at 9:15pm',
      reminder: true,
    },
  )
  // define a current task set to an observable
  currentTask = this.taskSource.asObservable();

  constructor() { }

  // create a function that calls next on the behaviorsubject to change its current value
  changeTask(task: Task) {
    this.taskSource.next(task)
    console.log(task)
  }
}

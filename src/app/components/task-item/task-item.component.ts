import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Task} from '../../Task'
import { faTimes, faPen } from '@fortawesome/free-solid-svg-icons';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css'],
})
export class TaskItemComponent implements OnInit {
  @Input() task!: Task;
  @Output() onDeleteTask : EventEmitter<Task> = new EventEmitter()
  @Output() onToggleReminder: EventEmitter<Task> = new EventEmitter()
  @Output() sendToParent: EventEmitter<Task> = new EventEmitter();
  
  faTimes = faTimes;
  faPen = faPen;
  editedTask!: Task;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    // subscribe to the current task observable
    // and set its value equal to the editedTask variable
    this.dataService.currentTask.subscribe(res => this.editedTask = res)
  }
  
  onDelete(task : Task) {
    this.onDeleteTask.emit(task)
  }

  onToggle(task: Task) {
    this.onToggleReminder.emit(task)
  }

  // a function that changes the value of the task
  // can be created in any of the components
  // when executed the new data will automatically be broadcast to all other components
  clickPen(task: Task) {
    this.dataService.changeTask(task)
    this.sendToParent.emit(task)
  }
}

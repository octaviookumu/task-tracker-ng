import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Task } from '../../Task';
import { UiService } from '../../services/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent implements OnInit, OnChanges {
  @Output() onAddTask: EventEmitter<Task> = new EventEmitter();
  @Input() taskFromParent!: Task;

  text!: string;
  day!: string;
  reminder: boolean = false;
  subscription!: Subscription;
  showAddTask: boolean = false;

  editedTask!: Task;

  constructor(private uiService: UiService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.taskFromParent) {
      console.log('THE CHANGES', changes['taskFromParent'].currentValue);

      let editableTask = changes['taskFromParent'].currentValue;

      this.text = editableTask.text;
      this.day = editableTask.day;
      this.reminder = editableTask.reminder;
    }
  }

  ngOnInit(): void {
    this.subscription = this.uiService.onToggle().subscribe((value) => {
      this.showAddTask = value;
    });
  }

  onSubmit() {
    if (!this.text) {
      alert('Please add a task!');
      return;
    }

    const newTask = {
      text: this.text,
      day: this.day,
      reminder: this.reminder,
    };

    this.onAddTask.emit(newTask);

    this.text = '';
    this.day = '';
    this.reminder = false;
  }
}

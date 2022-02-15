import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Task } from '../../Task';
import { UiService } from '../../services/ui.service';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data.service';

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

  constructor(private uiService: UiService, private dataService: DataService) {
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    // taskFromParent
    // console.log("CHANGES", changes['taskFromParent'].currentValue)

    if (this.taskFromParent) {
      console.log("THE CHANGES", changes['taskFromParent'].currentValue)

      let editableTask = changes['taskFromParent'].currentValue

      // { this.text, this.day, this.reminder  } = changes['taskFromParent'].currentValue
      this.text = editableTask.text;
      this.day = editableTask.day;
      this.reminder = editableTask.reminder;
    }
  }

  ngOnInit(): void {
    this.subscription = this.uiService.onToggle().subscribe((value) => {
      this.showAddTask = value;
    });

    // subscribe to the current task observable
    // and set its value equal to the editedTask variable
    this.dataService.currentTask.subscribe(res => this.editedTask = res)

    
    if (this.taskFromParent) {
      console.log("FINALLY", this.taskFromParent)
    } else {
      console.log("UNDEFINED")
    }
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

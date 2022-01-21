import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  private showAddTask: boolean = false;
  private subject = new Subject<any>()

  constructor() { }

  // toggles add button
  // we call this when we click the button
  toggleAddTask(): void {
    this.showAddTask = !this.showAddTask
    this.subject.next(this.showAddTask)
  }

  // fires off when we toggle
  // we do something when the button is clicked
  onToggle(): Observable<any> {
    return this.subject.asObservable();
  }


}

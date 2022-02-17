import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  private showAddTask: boolean = false;
  private subject = new Subject<any>()
  behaviourSubject = new BehaviorSubject<boolean>(false)
  isOpenByEdit: boolean = false;

  constructor() { }

  // toggles add button
  // we call this when we click the button
  toggleAddTask(): void {
    this.showAddTask = !this.showAddTask

    // checks whether form is opened by editbutton or add/close button
    if (this.isOpenByEdit == true) {
      this.showAddTask = false;
      this.isOpenByEdit = false
    }
    if (this.showAddTask == true) this.isOpenByEdit = false;
    // checks whether form is opened by editbutton or add/close button


    console.log("SHOW THIS ONE", this.isOpenByEdit)
    console.log("SHOW TASK", this.showAddTask)
    this.subject.next(this.showAddTask)
  }

  // fires off when we toggle
  // we do something when the button is clicked
  onToggle(): Observable<any> {
    return this.subject.asObservable();
  }

  editorEmitter() {
    this.behaviourSubject.next(true)
    this.isOpenByEdit = true;
    this.subject.next(this.isOpenByEdit)
  }
  
  editorOpener(): Observable<boolean>{
    return this.behaviourSubject.asObservable()
  }

}

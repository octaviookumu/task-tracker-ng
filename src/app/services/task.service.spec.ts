import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { TASKS } from '../mock-tasks';
import { Task } from '../Task';

import { TaskService } from './task.service';

describe('TaskService', () => {
  // let service: TaskService;
  // let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let taskService: TaskService;
  let controller: HttpTestingController;
  const expectedUrl = 'http://localhost:5000/tasks';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TaskService],
      imports: [HttpClientTestingModule],
    });
    taskService = TestBed.inject(TaskService);
    controller = TestBed.inject(HttpTestingController);
    // httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    // taskService = new TaskService(httpClientSpy);
  });

  it('should be created', () => {
    expect(taskService).toBeTruthy();
  });

  // it('#getTasks should return all tasks (HttpClient called once)', (done: DoneFn) => {

  //   const expectedTasks: Task[] = [...TASKS];

  //   httpClientSpy.get.and.returnValue(of(expectedTasks));

  //   taskService.getTasks().subscribe({
  //     next: (tasks) => {
  //       expect(tasks).withContext('expected tasks').toEqual(expectedTasks);
  //       done();
  //     },
  //     error: done.fail,
  //   });

  //   expect(httpClientSpy.get.calls.count()).withContext('one call').toBe(1);

  // });

  it('#getTasks() should return all tasks (HttpClient called once)', () => {

    // Using AAA(Arrange-Act-Assert) pattern
    // Arrange
    let expectedTasks: Task[] = [...TASKS];
    let actualTasks: Task[] = [];

    // Act
    taskService.getTasks().subscribe((tasks) => {

      // Assert-1
      // expect(tasks).toEqual(expectedTasks)

      actualTasks = tasks;
    });

    // Assert-1
    // It finds a request matching the given criteria and expects that there is exactly one match.
    const req = controller.expectOne(expectedUrl);

    // Assert-2
    expect(req.request.method).toEqual('GET')

    // Assert-4
    // Answer the request so the Observable emits a value.
    // We use the request’s flush method to respond with fake data.
    // This simulates a successful “200 OK” server response.
    // (Ensures the correct data was returned using Subscribe callback.)
    req.flush(expectedTasks);

    // Assert-3
    // we ensure that there are no pending requests left.
    // verify guarantees that the code under test is not making excess requests
    controller.verify();

    // Now verify emitted valued.
    // expect(actualTasks).toEqual(expectedTasks);

    // Assert-4
    expect(actualTasks).toEqual(expectedTasks)
  });

  it('#addTask() should add new task (HttpClient called once)', () => {
    
    // Arrange
    const expectedTask: Task = {
      id: 2,
      text: 'Meeting at School',
      day: 'May 6th at 1:30pm',
      reminder: true,
    }
    let actualTask = {}

    // Act
    taskService.addTask(expectedTask).subscribe((task) => {
      
      // Assert-1
      // expect(task).toEqual(expectedTask)

      actualTask = task
    })

    // Assert-1
    const req = controller.expectOne(expectedUrl)

    // Assert-2
    expect(req.request.method).toBe('POST')

    // Assert-3
    req.flush(expectedTask)

    // Assert-4
    controller.verify()

    // Assert-5
    expect(actualTask).toEqual(expectedTask)
  })
  
  it('#deleteTask() should delete a task (HttpClient called once)', () => {
    // Arrange
    const expectedTask: Task = {
      id: 2,
      text: 'Meeting at School',
      day: 'May 6th at 1:30pm',
      reminder: true,
    }
    let actualTask = {}

    // Act
    taskService.deleteTask(expectedTask).subscribe((task) => {

      // Assert-1
      // expect(task).toEqual(expectedTask)

      actualTask = task;
    })

    // Assert-1
    const req = controller.expectOne(`${expectedUrl}/${expectedTask.id}`)

    // Assert-2
    expect(req.request.method).toBe('DELETE')

    // Assert-3
    req.flush(expectedTask)

    // Assert-4
    controller.verify()

    // Assert-5
    expect(actualTask).toEqual(expectedTask)
  })

  it('#updateTaskReminder() should update the task reminder status', () => {
    // Arrange
    const expectedTask: Task = {
      id: 2,
      text: 'Meeting at School',
      day: 'May 6th at 1:30pm',
      reminder: true,
    }
    let actualTask = {}

    // Act
    taskService.updateTaskReminder(expectedTask).subscribe((task) => {
      
      // Assert-1
      // expect(task).toEqual(expectedTask)

      actualTask = task;
    })

    // Assert-1
    const req = controller.expectOne(`${expectedUrl}/${expectedTask.id}`)
    
    // Assert-2
    expect(req.request.method).toBe('PUT')

    // Assert-3
    req.flush(expectedTask)

    // Assert-4
    controller.verify()

    // Assert-5
    expect(actualTask).toEqual(expectedTask)
  })

  // it('#addTask should add a task (HttpClient called once)', () => {
  //   let expectedTask: Task = {
  //     id: 2,
  //     text: 'Meeting at School',
  //     day: 'May 6th at 1:30pm',
  //     reminder: true,
  //   };
  //   let actualTask = {};

  //   taskService.addTask(expectedTask).subscribe({
  //     next: (task) => {
  //       actualTask = task;
  //     },
  //     error: (error) => {
  //       console.log(error);
  //     },
  //   });

  //   const request = controller.expectOne(expectedUrl);
  //   request.flush(expectedTask);
  //   controller.verify();

  //   expect(actualTask).toEqual(expectedTask);
  // });

  // it('#deleteTask should delete task (HttpClient called once)', (done: DoneFn) => {
  //   const expectedTask: Task = {
  //     id: 2,
  //     text: 'Meeting at School',
  //     day: 'May 6th at 1:30pm',
  //     reminder: true,
  //   };

  //   httpClientSpy.get.and.returnValue(of(expectedTask))

  //   taskService.deleteTask(expectedTask).subscribe({
  //     next: (task) => {
  //       expect(task).withContext('expected task').toEqual(expectedTask);
  //       done();
  //     },
  //     error: done.fail,
  //   })

  //   expect(httpClientSpy.delete.calls.count()).withContext('one call').toBe(1)

  // });

  // it('should return an error when the server returns a 404', (done: DoneFn) => {
  //   const errorResponse = new HttpErrorResponse({
  //     error: 'test 404 error',
  //     status: 404,
  //     statusText: 'Not Found',
  //   });

  //   httpClientSpy.get.and.returnValue(of(errorResponse));

  //   taskService.getTasks().subscribe({
  //     next: (tasks) => done.fail('expected an error, not tasks'),
  //     error: (error) => {
  //       expect(error.message).toContain('test 404 error');
  //       done();
  //     },
  //   });
  // });

  it('should respond with a 500 error', () => {
    const status = 500;
    const statusText = 'Internal Server Error';
    const errorEvent = new ErrorEvent('API error');

    let actualError: HttpErrorResponse | undefined;

    taskService.getTasks().subscribe({
      next: () => {
        fail('next handler must not be called');
      },
      error: (error) => {
        actualError = error;
      },
      complete: () => {
        fail('complete handler must not be called');
      },
    });

    controller.expectOne(expectedUrl).error(
      errorEvent,
      { status, statusText }
    )

    if (!actualError) {
      throw new Error('Error needs to be defined');
    }
    expect(actualError.error).toBe(errorEvent);
  expect(actualError.status).toBe(status);
  expect(actualError.statusText).toBe(statusText);

    //   const request = controller.expectOne(expectedUrl)
    //   request.error(
    //     errorEvent,
    // { status, statusText }
    //   )
  });

  // it('should add new task (HttpClient called once)', (done: DoneFn) => {

  //   const expectedTask: Task = {
  //     id: 2,
  //     text: 'Meeting at School',
  //     day: 'May 6th at 1:30pm',
  //     reminder: true,
  //   }

  //   httpClientSpy.get.and.returnValue(of(expectedTask))

  //   taskService.addTask(expectedTask).subscribe({
  //     next: task => {
  //       expect(task).withContext('expected task').toEqual(expectedTask);
  //       done()
  //     },
  //     error: done.fail,
  //   })

  //   expect(httpClientSpy.post.calls.count()).withContext('one call').toBe(1);

  // })
});

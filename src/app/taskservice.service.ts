import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from './models/Task';

@Injectable({
  providedIn: 'root'
})
export class TaskserviceService {

 TaskUrl = "http://localhost:5126/api/TaskItems"

  constructor(private http:HttpClient) { }

  getTask(){
    return this.http.get<Task[]>(this.TaskUrl)
  }

  createTask(task:Task){
    return this.http.post(this.TaskUrl, task)
  }

  DeleteTask(taskId:number){
    return this.http.delete(this.TaskUrl+'/'+taskId)
  }

  getTaskById(TaskId:number){
    return this.http.get<Task>(this.TaskUrl+'/'+TaskId)
  }

  Update(task: Task){
    return this.http.put(this.TaskUrl+'/'+task.id, task)
  }
}


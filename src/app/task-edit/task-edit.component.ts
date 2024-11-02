import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskserviceService } from '../taskservice.service';
import { Task } from '../models/Task';
import { Subscription } from 'rxjs';
import { User } from '../models/User';
import { UserService } from '../user.service';


@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrl: './task-edit.component.css'
})
export class TaskEditComponent implements OnInit {

  EditTaskform: FormGroup;
  taskId: number;
  currentTask! : Task;
  subscribtion: Subscription = new Subscription();
  users:User[]=[];


  constructor(private fb: FormBuilder,
    private taskservice: TaskserviceService,
    private router: Router,
     private route: ActivatedRoute,
    private UserService:UserService
  ) {
    const tid = this.route.snapshot.paramMap.get("id");
    this.taskId = Number(tid);
    console.log(tid);


    this.EditTaskform = this.fb.group({
      id: [''],
      title: ['', [Validators.required]],
      description: [''],
      dueDate: [''],
      priority: ['', [Validators.required]],
      assingeId : ['']
    })
  }

  ngOnInit(): void {
    if (this.taskId != null) {
      this.taskservice.getTaskById(this.taskId).subscribe(data =>{
        this.currentTask = data;
        console.log(this.currentTask)
        let formetdate =new Date(data.deuDate).toISOString().slice(0,10);
        this.EditTaskform.patchValue({
          id:data.id,
          title:data.title,
          description:data.description,
          dueDate:formetdate,
          priority:data.priority
        });
      })
      this.UserService.getUsers().subscribe(data=>{
        this.users= data;
        console.log(data);

      })
    }
  }


  onAddTask() {
    let task: Task = (this.EditTaskform.value);
    console.log(this.EditTaskform.value)
    console.log(task);
    this.taskservice.Update(task).subscribe(data => {
      alert("Update successfuly..")
      this.router.navigate(['/tasks'])
    }, error => {
      alert("Updated Failed!")

    });

  }

  cencel() {
    this.EditTaskform.reset();
    this.router.navigate(['/']);
  }

}

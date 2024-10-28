import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskserviceService } from '../taskservice.service';
import { Task } from '../models/Task';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrl: './task-edit.component.css'
})
export class TaskEditComponent implements OnInit {

  EditTaskform: FormGroup;
  taskId: number;
  subscribtion: Subscription = new Subscription();


  constructor(private fb: FormBuilder, private taskservice: TaskserviceService,
    private router: Router, private route: ActivatedRoute) {
    const tid = this.route.snapshot.paramMap.get("id");
    this.taskId = Number(tid);
    console.log(tid);
    

    this.EditTaskform = this.fb.group({
      id: [''],
      title: ['', [Validators.required]],
      description: [''],
      dueDate: [''],
      priority: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    if (this.taskId != null) {
      this.taskservice.getTaskById(this.taskId).subscribe(data =>{
        let formetdate =new Date(data.deuDate).toISOString().slice(0,10);
        this.EditTaskform.patchValue({
          id:data.id,
          title:data.title,
          description:data.description,
          dueDate:formetdate,
          priority:data.priority
        });
      })
    }
  }


  onAddTask() {
    let task: Task = (this.EditTaskform.value);

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

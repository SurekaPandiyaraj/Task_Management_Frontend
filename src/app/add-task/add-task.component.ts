import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { TaskserviceService } from '../taskservice.service';
import { Route, Router } from '@angular/router';
import { __assign } from 'tslib';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css'
})
export class AddTaskComponent {

        addtaskform: FormGroup;

        constructor(private fb:FormBuilder,private taskserviceService: TaskserviceService,private router:Router){
          this.addtaskform = this.fb.group({
            title : ['',[Validators.required]],
            description : [''],
            dueDate : [''],
            priority : ['',[Validators.required]],
            assinge : ['']
          })
        }
      

       onAddTask(){
       let task=(this.addtaskform.value);
       console.log(task);
        this.taskserviceService.createTask(task).subscribe(data =>{
          alert("Create successfuly..")
          this.router.navigate(['/'])
        }, error => {
          alert("Created Fail!")

        });
        
       }

       cencel(){
        this.addtaskform.reset();
        this.router.navigate(['/']);
       }
      
}

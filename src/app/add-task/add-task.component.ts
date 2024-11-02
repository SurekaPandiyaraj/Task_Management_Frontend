import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { TaskserviceService } from '../taskservice.service';
import { Route, Router } from '@angular/router';
import { __assign } from 'tslib';
import { User } from '../models/User';
import { UserService } from '../user.service';


@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css'
})
export class AddTaskComponent implements OnInit {

        addtaskform: FormGroup;
        users : User[]=[]

        constructor(private fb:FormBuilder,private taskserviceService: TaskserviceService,private router:Router, private userservice : UserService){
          this.addtaskform = this.fb.group({
            title : ['',[Validators.required]],
            description : [''],
            dueDate : [''],
            priority : ['',[Validators.required]],
            assingeId : ['']
          })
        }

       ngOnInit(): void {
         this.userservice.getUsers().subscribe(data =>{
          this.users = data
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

       cancel(){
        this.addtaskform.reset();
        this.router.navigate(['/']);
       }


       get mycheckList():FormArray{
        return this.addtaskform.get('checkList') as FormArray;
       }

       addCheckList(){
        this.mycheckList.push(this.fb.group({
          name:[''],
          isDone:false
        }))
       }

       removeCheckList(index:number){
        this.mycheckList.removeAt(index);
       }


}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/User';


@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.css'
})
export class UserEditComponent implements OnInit{

  userForm : FormGroup;
  isEditMode = false;
  Id : number

  constructor(private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router

  ){

    const uid = this.route.snapshot.paramMap.get("id");
    this.Id = Number(uid);

    this.userForm = this.fb.group({
      name:['',[Validators.required]],
      email:[''],
      password: [''],
      phoneNumber:['', [Validators.required]],
      assignee:['']
    })

    if(uid){
      this.isEditMode = true;
    } else{
      this.isEditMode =false;
    }

  }
  ngOnInit(): void {
    this.userService.getUser(this.Id).subscribe(data =>{
      this.userForm.patchValue({
        name:data.name,
        email:data.email,
        password:data.password,
        phoneNumber:data.phoneNumber
      });
    })
    
  }

  cancel() {
    this.userForm.reset();
  }



  onSubmit(){
    let user : User = this.userForm.value;
    if(this.isEditMode == true){
      user.id = this.Id
      this.userService.updateUser(user).subscribe(data => {
        alert("Update Successfuly!")
        this.router.navigate(["/users"])
      })
    } else{
      this.userService.createUser(user).subscribe(data =>{
        alert("Create Successfully!")
        this.router.navigate(["/users"])
      })
    }
    
  }
}

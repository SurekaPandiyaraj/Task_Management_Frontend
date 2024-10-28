import { Component } from '@angular/core';
import { UserService } from '../user.service';

import { Router } from '@angular/router';
import { User } from '../models/User';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
 searchText: string = ' ';
 user: User[] = [];

 constructor(
  private userservice:UserService,

  private router: Router)
 {}

 ngOnInit():void{
  this.loadUser();
  
 }

 onDelete(userId:number){
  if(confirm('Do you want to delete?')){
    this.userservice.deleteUser(userId).subscribe(data => {
    //  this.toastr.success('User is deleted',"Deleted",{
    //   timeOut: 10000,
    //   closeButton: true
    //  });
     this.loadUser(); 
    });
  }
 }

 loadUser() {
   this.userservice.getUsers().subscribe(data =>{
    this.user = data;
   });
  }

  onEdit(userId:number){
    this.router.navigate(['/user-edit',userId])
  }
}





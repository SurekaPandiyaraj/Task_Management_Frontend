import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTaskComponent } from './add-task/add-task.component';
import { ListTaskComponent } from './list-task/list-task.component';
import { TaskEditComponent } from './task-edit/task-edit.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserEditComponent } from './user-add/user-edit.component';

const routes: Routes = [
  {path : 'add' , component : AddTaskComponent},
  {path : 'user-add' , component : UserEditComponent},
  {path : 'user-edit/:id' , component : UserEditComponent},

  {path : 'tasks' , component : ListTaskComponent},
  {path : 'users' , component : UserListComponent},

  {path : 'edit/:id',component: TaskEditComponent},
  {path : 'user/:id',component:UserListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

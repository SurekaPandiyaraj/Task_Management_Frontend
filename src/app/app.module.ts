import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AddTaskComponent } from './add-task/add-task.component';
import { ListTaskComponent } from './list-task/list-task.component';
import { TaskFilterPipe } from './task-filter.pipe';
import { TaskEditComponent } from './task-edit/task-edit.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserEditComponent } from './user-add/user-edit.component';
import { TaskPipe } from './task.pipe';
import { TooltipModule } from 'ngx-bootstrap/tooltip';


@NgModule({
  declarations: [
    AppComponent,
    AddTaskComponent,
    ListTaskComponent,
    TaskFilterPipe,
    TaskEditComponent,
    UserListComponent,
    UserEditComponent,
    TaskPipe

  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    TooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
  
})
export class AppModule { }

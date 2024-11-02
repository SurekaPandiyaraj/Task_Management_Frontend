import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../models/Task';
import { TaskserviceService } from '../taskservice.service';

@Component({
  selector: 'app-list-task',
  templateUrl: './list-task.component.html',
  styleUrl: './list-task.component.css'
})
export class ListTaskComponent implements OnInit {

  searchText: string = '';

  tasks: Task[] = [];

  constructor(private router: Router, private taskService: TaskserviceService, private route: ActivatedRoute) {


  }

  ngOnInit(): void {
    this.loadTask()

  }

  onDelete(taskId: number) {
    if (confirm('Do you want to delete?')) {
      this.taskService.DeleteTask(taskId).subscribe(data => {
        // this.toastr.success('Task is deleted', "Deleted", {
        //   timeOut: 10000,
        //   closeButton: true
        // });
        this.loadTask();
      });
    }
  }

  loadTask() {
    this.taskService.getTask().subscribe(d => {
      console.log(d);
      
      this.tasks = d;

    })
  }

  onEdit(taskId: number) {
    this.router.navigate(['/edit', taskId])
  }

}

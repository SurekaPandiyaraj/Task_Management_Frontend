import { Pipe, PipeTransform } from '@angular/core';
import { Task } from './models/Task';

@Pipe({
  name: 'task'
})
export class TaskPipe implements PipeTransform {

  transform(value: Task[], ...args: string[]): Task[] {
    const searchText = args[0];
    return value.filter(a => a.title.toLowerCase().includes(searchText.toLowerCase()) || a.description.toLowerCase().includes(searchText.toLowerCase()) || a.user?.name.toLowerCase().includes(searchText.toLowerCase()));
  }

}

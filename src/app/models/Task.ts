import { User } from "./User";

export interface Task {
    id: number;
    title: string;
    description: string;
    deuDate: Date;
    priority: string;
    user : User;
  }
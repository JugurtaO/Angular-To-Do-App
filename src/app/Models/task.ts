import { User } from "./user";

export class Task {
    id!:number;
    text!:string;
    dueDate!:Date;
    author!:User;
    
}

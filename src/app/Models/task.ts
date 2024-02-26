import { STATUS } from "../status";
import { User } from "./user";


export class Task {
    id!:number;
    text!:string;
    dueDate!:string;
    status!:STATUS;
    author!:User;
    
}

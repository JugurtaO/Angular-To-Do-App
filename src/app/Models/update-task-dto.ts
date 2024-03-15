import { STATUS } from "../status"

export class UpdateTaskDTO {
    newText!:string
    newDueDate!:string
    newStatus!:STATUS
}

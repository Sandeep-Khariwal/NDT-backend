import { Status } from "../enums/status.enum";

export interface PartInterface {
    _id: string;
    name:string;
    heatNumber:string;
    status:Status;
    incomingTime:string;
    releaseTime:string;
    holdTime:string;
    department:string
    incomingDate:string
    releaseDate:string
}
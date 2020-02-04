import { IUser } from "./user";
import { IReceiver } from "./receiver";

export interface ILoginRes {
    success:boolean;
    err:string;
    user:IReceiver;
}
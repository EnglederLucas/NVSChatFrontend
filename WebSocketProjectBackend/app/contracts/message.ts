import { IUser } from "./user";
import { IReceiver } from "./receiver";

export interface IMessage {
    messageId:number;
    message:string;
    receiver:IReceiver;
    sender:IReceiver;
}
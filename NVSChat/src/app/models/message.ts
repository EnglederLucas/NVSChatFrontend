import {IMessage} from '../contracts/imessage';
import {IUser} from '../contracts/iuser';

export class Message implements IMessage{
  message: string;
  messageId: number;
  receiver: IUser;
  sender: IUser;
}

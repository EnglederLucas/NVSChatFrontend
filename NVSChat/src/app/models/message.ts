import {IMessage} from '../contracts/imessage';
import { IReceiver } from '../contracts/IReceiver';

export class Message implements IMessage{
  message: string;
  messageId: number;
  receiver: IReceiver;
  sender: IReceiver;
}

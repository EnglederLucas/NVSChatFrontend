import {IReceiver} from './ireceiver';

export interface IMessage {
  messageId: number;
  message: string;
  receiver: IReceiver;
  sender: IReceiver;
}

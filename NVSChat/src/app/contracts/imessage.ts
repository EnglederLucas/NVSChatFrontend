import {IUser} from './iuser';

export interface IMessage {
  messageId: number;
  message: string;
  receiver: IUser;
  sender: IUser;
}

import {IUser} from '../contracts/iuser';

export class User implements IUser {
  userId: number;
  userName: string;
}

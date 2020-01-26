import {Component, Input, OnInit} from '@angular/core';
import {IMessage} from '../../contracts/imessage';
import {log} from 'util';
import {IUser} from '../../contracts/iuser';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})
export class ChatWindowComponent implements OnInit {
//TODO: Mit @Input fixen
  userInput: IUser = {
    userName: 'Lux',
    userId: 3
  };
  curMessage: string;

  public messageArr: Array<IMessage> = new Array<IMessage>();



  constructor() {
    const u: IUser = {
      userId: 1,
      userName: 'Joe'
    };

    const u2: IUser = {
      userId: 2,
      userName: 'Peter'
    };

    const m: IMessage = {
      message: 'Hallo wie gehts?',
      messageId: 1,
      sender: u,
      receiver: u2
    };
    this.messageArr.push(m);
    const a: IMessage = {
      message: '?',
      messageId: 2,
      receiver: u,
      sender: u2
    };
    this.messageArr.push(a);

    const bb: IMessage = {
      message: 'Idk',
      messageId: 4,
      receiver: u,
      sender: u2
    };

    this.messageArr.push(bb);
    this.messageArr.push(bb);
    this.messageArr.push(bb);
    this.messageArr.push(bb);

    const own: IMessage = {
      message: 'Ich bins',
      messageId: 5,
      sender: this.userInput,
      receiver: u
    };

    this.messageArr.push(own);
  }

  sendMessage(mes: string): void{
    console.log(mes);
    //TODO: sendMessage with sockets logic
  }
  
  checkIfSent(mes: IMessage): boolean {
    return mes.sender.userId === this.userInput.userId;
  }

  ngOnInit() {
  }

}

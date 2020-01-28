import { IMessage } from './../../contracts/imessage';
import { Message } from './../../models/message';
import { ChatService } from './../../services/chat.service';
import { IReceiver } from './../../contracts/ireceiver';
import {Component, Input, OnInit} from '@angular/core';
import {log} from 'util';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})
export class ChatWindowComponent implements OnInit {
//TODO: Mit @Input fixen
  @Input() me: IReceiver;
  @Input() chatPartner: IReceiver;


  curMessage = '';
  public messageArr: Array<IMessage> = new Array<IMessage>();


  constructor(private chat: ChatService) {
    chat.incomingMessages.subscribe((mes) => {
      if (mes.sender.id === this.chatPartner.id) {
        this.messageArr.push(mes);
      }
    });

    const u: IReceiver = {
      id: 1,
      name: 'Joe',
      isGroup: false
    };

    const u2: IReceiver = {
      id: 2,
      name: 'Peter',
      isGroup: false
    };

    const lux: IReceiver = {
      id: 5,
      name: 'Lux',
      isGroup: false
    };

    this.me = lux;

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
      sender: u2,
    };
    this.messageArr.push(a);

    const bb: IMessage = {
      message: 'Idk',
      messageId: 4,
      receiver: u,
      sender: lux
    };

    this.messageArr.push(bb);
    this.messageArr.push(bb);
    this.messageArr.push(bb);
    this.messageArr.push(bb);

    const own: IMessage = {
      message: 'Ich bins',
      messageId: 5,
      sender: this.me,
      receiver: u
    };

    this.messageArr.push(own);
  }

  sendMessage(mes: string): void{
    if(mes === '' || mes === null) { return };

    console.log(mes);
    const res: IMessage = {
      message: mes,
      sender: this.me,
      receiver: this.chatPartner,
      messageId: null
    };

    this.chat.sendMessage(res);
    this.messageArr.push(res);
    this.curMessage = '';
  }
  
  checkIfSent(mes: IMessage): boolean {
    return mes.sender.id === this.me.id;
  }

  ngOnInit() {
  }

}

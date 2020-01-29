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
    this.chat.incomingMessages.subscribe((mes) => {
      console.log('Got message from server: ' + JSON.stringify(mes));
      if (mes.sender.id === this.chatPartner.id) {
        this.messageArr.push(mes);
      }
    });
    console.log(JSON.stringify(this.chatPartner));
  }

}

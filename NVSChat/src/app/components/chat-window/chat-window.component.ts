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
  @Input() me: IReceiver;
  @Input() chatPartner: IReceiver;
  @Input() messages: Array<IMessage>;

  curMessage = '';
  public messageArr: Array<IMessage> = new Array<IMessage>();


  constructor(private chat: ChatService) {
  }

  sendMessage(mes: string): void{
    if (mes === '' || mes === null) { return; };

    console.log(mes);
    const res: IMessage = {
      message: mes,
      sender: this.me,
      receiver: this.chatPartner,
      messageId: null
    };

    this.chat.sendMessage(res);
    console.log('Pushing Message');
    this.messageArr.push(res);
    this.curMessage = '';
  }
  
  checkIfSent(mes: IMessage): boolean {
    return mes.sender.id === this.me.id;
  }

  ngOnInit() {
    console.log('ngOnInit chatWindow');

    this.messageArr = this.messages.filter(mes => mes.receiver.id === this.chatPartner.id && mes.sender.id === this.chatPartner.id);
    console.log(this.chatPartner.name + ' ' + "My Messsages " + this.messageArr.length);

    console.log(JSON.stringify(this.chatPartner));
  }

}

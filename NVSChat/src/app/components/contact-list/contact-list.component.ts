import { IReceiver } from './../../contracts/ireceiver';
import { ChatService } from './../../services/chat.service';
import { EventEmitter } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { Component, OnInit, Input, Output } from '@angular/core';
import { IMessage } from 'src/app/contracts/imessage';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})

export class ContactListComponent implements OnInit {
  @Input() me: IReceiver;
  allChats: Array<IReceiver> = new Array<IReceiver>();
  unreadCounter: Map<number, number> = new Map<number, number>();
  selectedReceiver: IReceiver;
  allMessages: Array<IMessage> = new Array<IMessage>();


  constructor(private service: ChatService) {
  }

  onContactClick(receiver: IReceiver) {
    this.selectedReceiver = receiver;
    this.unreadCounter[receiver.id] = 0;
    console.log("Receiver: " + receiver + " Sender: " + this.me);
  }

  getUnreadCounter (rec: IReceiver){
    return this.unreadCounter[rec.id];
  }

  ngOnInit() {
    this.service.getAllChatPartners(this.me).subscribe((rec) => {
     this.allChats = rec;
     this.selectedReceiver = this.allChats[0];
    });

    this.service.getAllMessages(this.me).subscribe((messages) => this.allMessages = messages);

    this.service.incomingMessages.subscribe((mes) => {
      this.unreadCounter[mes.receiver.id]++;
      this.allMessages.push(mes);
    });

    console.log('Subscribed to services');
  }

}

import { ChatService } from './../../services/chat.service';
import { IReceiver } from 'src/app/contracts/IReceiver';
import { EventEmitter } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})

export class ContactListComponent implements OnInit {
  @Input() me: IReceiver;
  allChats: Array<IReceiver> = new Array<IReceiver>();
  selectedReceiver: IReceiver;

  constructor(private service: ChatService) {
  }

  onContactClick(receiver: IReceiver) {
    this.selectedReceiver = receiver;
  }


  ngOnInit() {
   this.service.getAllChatPartners(this.me).subscribe((rec) => {
     this.allChats = rec;
     this.selectedReceiver = this.allChats[0];
    });
  }

}

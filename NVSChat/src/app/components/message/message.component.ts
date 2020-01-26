import {Component, Input, OnInit} from '@angular/core';
import {IMessage} from '../../contracts/imessage';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  @Input() public message: IMessage;
  @Input() public sent: boolean;

  constructor() { }

  ngOnInit() {
  }

  public getClassName(): string {
    return this.sent ? 'sent' : 'received';
  }

}

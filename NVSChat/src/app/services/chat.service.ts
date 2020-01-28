import { IReceiver } from 'src/app/contracts/IReceiver';
import { Socket } from 'ngx-socket-io';
import { IMessage } from './../contracts/imessage';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  incomingMessages = this.socket.fromEvent<IMessage>('message');
  successfulLogin = this.socket.fromEvent<any>('login');

  constructor(private socket: Socket) {
      //this.socket = io(this.url);
  }

  public sendMessage(message: IMessage) {
    this.socket.emit('message', message);
  }

  public login(username: string) {
    const req = {
      userName: username,
      password: null
    };

    this.socket.emit('login', req);
  }

  public getAllChatPartners(me: IReceiver) {
    this.socket.emit('get-all-chat-partners', me);
    return this.socket.fromEvent<any>('get-all-chat-partners');
  }

  /*public getMessages = () => {
      return Observable.create((observer) => {
          this.socket.on('message', (message) => {
              observer.next(message);
          });
      });
  }*/


}

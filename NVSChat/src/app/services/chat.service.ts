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

  public login(username: string, password: string) {
    const req = {
      userName: username,
      password: password
    };

    console.log(req.userName + ' ' + req.password)

    this.socket.emit('login', req);
  }

  public getAllChatPartners(me: IReceiver) {
    this.socket.emit('receivers', me);
    return this.socket.fromEvent<IReceiver[]>('receivers');
  }

  /*public getMessages = () => {
      return Observable.create((observer) => {
          this.socket.on('message', (message) => {
              observer.next(message);
          });
      });
  }*/


}

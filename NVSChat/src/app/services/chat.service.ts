import { IReceiver } from 'src/app/contracts/IReceiver';
import { Socket } from 'ngx-socket-io';
import { IMessage } from './../contracts/imessage';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  incomingMessages = this.socket.fromEvent<IMessage>('message');
  successfulLogin = this.socket.fromEvent<any>('login');

  constructor(private socket: Socket, private http: HttpClient) {
  }

  public getAllMessagesHttp(me: IReceiver) {
    console.log('Chat Service: Get All Messages Http');
    
    return this.http.get<IMessage[]>('http://localhost:3030/allmessages/' + me.id);
  }

  public getAllMessages(me: IReceiver) {
    console.log('Chat Service: Get All Messages Socket');

    this.socket.emit('allmessages', me);
    return this.socket.fromEvent<IMessage[]>('allmessages');
  }

  public getAllChatPartnersHttp(me: IReceiver) {
    return this.http.get<IReceiver[]>('http://localhost:3030/receivers/' + me.id);
  }

  public getAllChatPartners(me: IReceiver) {
    this.socket.emit('receivers', me);
    return this.socket.fromEvent<IReceiver[]>('receivers');
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
}

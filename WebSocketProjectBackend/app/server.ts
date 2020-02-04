import { createServer, Server } from 'http';
import express, { json } from 'express';
import socketIo from 'socket.io';
import { ILoginReq } from './contracts/loginReq';
import { Repository } from './repository/repository';
import { IMessage } from './contracts/message';
import { ILoginRes } from './contracts/loginRes';
import { IReceiver } from './contracts/receiver';
import { IUser } from './contracts/user';
import { IGroup } from './contracts/Groups';

export class ChatServer {
    private app: express.Application;
    private server: Server;
    private io: SocketIO.Server;
    private port: number;
    private repo: Repository = new Repository();
    

    constructor() {
      console.log('ctortest');
      this.app = express();
      this.server = createServer(this.app);
      this.port = 3030;
      this.io = socketIo(this.server);
      this.listen();
    }

    private listen(): void {
        this.server.listen(this.port, () => {
            console.log('Runing server on port %s', this.port);
        });

        this.io.on('connect', (socket: any) => {
            let loggedIn: boolean = false;
            socket.on('login', async (login: ILoginReq) => {
                loggedIn = false;
                loggedIn = await this.repo.login(login);
                let res: ILoginRes = {success:false, err:"login failed", user: {id: -1, name:"default", isGroup:false}}
                if(loggedIn){
                    console.log('login with: '+ login.userName);
                    let user: IUser = await this.repo.getUserByName(login.userName)
                    res = {success:true, err:"", user:{id: user.userId, name: user.userName, isGroup: false}}; //Log in 
                    socket.emit('login', res);

                    let rooms: IGroup[] = await this.repo.getGroupsByUserId(user.userId); //Get Group names

                    rooms.forEach(element => {
                        socket.join(element.groupName); //join groups
                    });
                    socket.join(login.userName); //join room named like userName

                    socket.on('message', (message: IMessage) => {
                        console.log('message: ' + JSON.stringify(message));
                        this.repo.insertMessage(message);
                        let rstring: string = message.receiver.name;
                            socket.to(message.receiver.name).emit('message', message);
                    });

                    socket.on('receivers', async (user: IReceiver) => {
                        console.log(JSON.stringify(user));
                        let receivers: IReceiver[] = await this.repo.getReceiversById(user.id);
                        console.log('sending receivers in receiver call ' + receivers);
                        socket.emit('receivers', receivers) //send receivers
                    })
                    socket.on('allmessages', async (user: IReceiver) => {
                        console.log(JSON.stringify(user));
                        let allmessages: IMessage[] = await this.repo.getAllMessagesById(user.id);
                        console.log('sending messages in message call ' + allmessages);
                        socket.emit('allmessages', allmessages) //send receivers
                    })
                }else{
                    socket.emit('login', res);
                }
            });


            socket.on('disconnect', () => {
                console.log('Client disconnected');

            });
        });
    }

    public getApp(): express.Application {
        return this.app;
    }

}
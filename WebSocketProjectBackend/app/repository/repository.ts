import * as mariadb from 'mariadb';
import { IMessage } from '../contracts/message';
import { IUser } from '../contracts/user';
import { ILoginReq } from '../contracts/loginReq';
import { IReceiver } from '../contracts/receiver';
import { IGroup } from '../contracts/Groups';


export class Repository {
    
    public pool: mariadb.Pool = mariadb.createPool({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'websocketdb',
        connectionLimit: 5
    });

    public async findAllMessages(): Promise<Array<IMessage>> {
        // Query absetzen
        let messages = Array<IMessage>();
        await this.pool
            .query("SELECT id, message from message")
            .then (rows => {messages = rows;})
            .catch(err => {console.log('error in findAll');});

        return new Promise(function (resolve, reject) {
            messages ? resolve(messages) : reject(messages);
        });
    }

    public async findAllUsersNew(): Promise<Array<IUser>> {
        try {
            return await this.pool.query("SELECT userid, username from user");
        } catch(ex) {
            console.log('error in findAll');
            return [];
        }
    }

    public async findUserById(id: number): Promise<any> {
        let user = {};
        await this.pool
            .query("SELECT userid, username FROM user WHERE userid=" + id)
            .then(row => {user = row;})
            .catch(err => {console.log('error in findUserById');});

        return new Promise(function (resolve, reject) {
            user ? resolve(user) : reject(user);
        });
    }
    public async findGroupById(id: number): Promise<any> {
        let group = {};
        await this.pool
            .query("SELECT groupId, groudName FROM user WHERE userid=" + id)
            .then(row => {group = row;})
            .catch(err => {console.log('error in findUserById');});

        return new Promise(function (resolve, reject) {
            group ? resolve(group) : reject(group);
        });
    }

    public async getUsers(): Promise<Array<IUser>>{
        let users: Array<IUser> = await this.pool
                .query("SELECT userId, userName from user");
        return users.map(row => {
            return {userId: row.userId, userName: row.userName}
        });
    }

    public async getUserByName(userName: String): Promise<IUser>{
            // Query absetzen
            let users: Array<IUser> = await this.pool
                .query("SELECT userId, userName from user WHERE username=?", userName);
            let user: IUser =  {userId: users[0].userId, userName: users[0].userName};
            return user;
    }

    public async getUserById(id: number): Promise<IUser>{
        // Query absetzen
        let users: Array<IUser> = await this.pool
            .query("SELECT userId, userName from user WHERE userId=?", id);
        let user: IUser =  {userId: users[0].userId, userName: users[0].userName};
        return user;
    }

    public async getGroupById(id: number): Promise<IGroup>{
        // Query absetzen
        let groups: Array<IGroup> = await this.pool
            .query("SELECT groupId, groupName FROM websocketdb.`group` WHERE groupId=?", id);
        let group: IGroup =  {groupId: groups[0].groupId, groupName: groups[0].groupName};
        return group;
    }
    public async login(loginReq: ILoginReq): Promise<boolean>{
        // Query absetzen
        let users: Array<IUser> = await this.pool
            .query("SELECT userId, userName from user WHERE username=? and password=?", [loginReq.userName, loginReq.password]);
        if(users.length != 1) return false;
        return true;
    }

    public async getGroupsByUserId(id: number): Promise<Array<IGroup>> {
        let groups: Array<IGroup> = await this.pool
            .query("SELECT groupName, groupId FROM websocketdb.groupuser gp Natural JOIN websocketdb.group g WHERE gp.userid = ?", id);
        return groups.map(row => {return {groupId: row.groupId, groupName: row.groupName};});

    }

    public async getReceiversById(id: number): Promise<Array<IReceiver>>{
        let users: Array<IUser> = await this.getUsers();
        let groups: Array<IGroup> = await this.getGroupsByUserId(id);
        let receivers: Array<IReceiver> = [];
        users.forEach(user => {
            receivers.push({name: user.userName, id: user.userId, isGroup: false})
        })
        groups.forEach(group => {
            receivers.push({name: group.groupName, id: group.groupId, isGroup: true})
        })
        return receivers;
    }

    public async getAllMessagesById(id: number): Promise<Array<IMessage>>{
        let m: Array<any> = await this.pool.query("SELECT id,message,sender,receiver,isGroup FROM message WHERE sender=? or receiver=?",[id,id]);
        let remessages: Array<IMessage> = [];
        for (let i = 0; i < m.length; i++) {
            remessages.push({message: m[i].message, messageId:m[i].id, sender: await this.getReceiverById(m[i].sender, 0), receiver: await this.getReceiverById(m[i].receiver, m[i].isGroup)})
        }
        return remessages;;

    }

    public async insertMessage(message: IMessage): Promise<void> {
        let done: boolean = false;
        await this.pool
            .query("INSERT  INTO message VALUE (null,?,?,?,?) ", [message.message,message.sender.id,message.receiver.isGroup?1:0,message.receiver.id])
            .then(() => {done = true})
            .catch(err => {console.log('error in insertUser');
        });

        return new Promise(function (resolve, reject) {
            done ? resolve() : reject();
        });
    }

    public async getReceiverById(id:number, isGroup: number): Promise<IReceiver>{
        let receiver: IReceiver;
        if(isGroup == 1){
            let group: IGroup = await this.getGroupById(id);
            receiver={name: group.groupName, id: group.groupId, isGroup: true};
        }
        else{
            let user: IUser = await this.getUserById(id);
            receiver={name: user.userName, id: user.userId, isGroup: false};
        }
        return receiver;
    }

    public async insertUser(u: IUser): Promise<void> {
        let done: boolean = false;
        await this.pool
            .query("INSERT  INTO user VALUE (?,?) ", [u.userId, u.userName])
            .then(() => {done = true})
            .catch(err => {console.log('error in insertUser');
        });

        return new Promise(function (resolve, reject) {
            done ? resolve() : reject();
        });

    }

    public async updateUserById(id: number, u: IUser): Promise<any> {
        let user = {};
        await this.pool
            .query("UPDATE user SET username=? WHERE userid=?", [u.userName, id])
            .then(row => { user = row; })
            .catch(err => { console.log('error in findUserById'); });


        return new Promise(function (resolve, reject) {
            user ? resolve(user) : reject(user);
        });
    } 

     public async deleteUserById(id: number): Promise<boolean> {
        let done: boolean = false;
        await this.pool
            .query("DELETE FROM user WHERE userid=?" , [id])
            .then(() => {done = true;})
            .catch(err => {console.log('error in findById');});

        return new Promise(function (resolve, reject) {
            done ? resolve() : reject();
        });
    } 

    public async deleteAll(): Promise<boolean> {
        let done:boolean = false;
        await this.pool
            .query("DELETE FROM user")
            .then ( () => {done=true;})
            .catch(err => { console.log('error in deleteAll'); });

        return new Promise(function (resolve, reject) {
            done ? resolve() : reject();
        });
    }
}
import { IReceiver } from 'src/app/contracts/IReceiver';
import { ChatService } from './../../services/chat.service';
import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  showSpinner: boolean;
  @Output() logIn: EventEmitter<any> = new EventEmitter<any>();
  username: string;
  password: string;

  constructor(private service: ChatService) { }

  ngOnInit() {
  }

  onLogin(){
    //TODO login
    this.service.successfulLogin.subscribe((res) => {
      this.showSpinner = false;
      if (res.success === true) {
        this.logIn.emit(res.user);
      }
      else {
        console.log(res.err);
      }
    });

    this.service.login(this.username, this.password);
  }
}

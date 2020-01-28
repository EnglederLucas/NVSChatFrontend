import {Component, OnInit} from '@angular/core';
import { IReceiver } from "./contracts/IReceiver";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'NVSChat';
  loggedIn = false;
  user: IReceiver;


  logInCompleted(me: IReceiver) {
    this.user = me;
    this.loggedIn = true;
  }
}

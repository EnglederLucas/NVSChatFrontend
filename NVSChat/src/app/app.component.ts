import {Component, OnInit} from '@angular/core';
import {IUser} from './contracts/iuser';
import {User} from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'NVSChat';
  loggedIn: boolean = false;

  logInCompleted(){
    this.loggedIn = true;
  }

  public lux: User = {
    userId: 1,
    userName: 'Man'
  };

  ngOnInit(): void {
    this.lux = {
      userName: 'Lux',
      userId: 3
    };
  }


}

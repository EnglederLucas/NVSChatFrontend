import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  showSpinner: boolean;
  @Output() logIn: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

  onLogin() {
    //TODO login
    this.showSpinner = false;
    this.logIn.emit(null);
    return;
  }
 
  authenticate(userJwt: string) {
    //TODO authenticate
  }
}

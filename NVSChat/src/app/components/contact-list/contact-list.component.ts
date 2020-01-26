import { MatListModule } from '@angular/material/list';
import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/contracts/iuser';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  allChats: Array<IUser> = new Array<IUser>();

  constructor() { }

  ngOnInit() {
    const u: IUser = {
      userId: 1,
      userName: 'Joe'
    };

    const u2: IUser = {
      userId: 2,
      userName: 'Peter'
    };

    this.allChats.push(u);
    this.allChats.push(u2);
  }

}

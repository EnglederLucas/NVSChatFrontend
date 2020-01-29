import { MaterialModule } from './material/material.module';
import { BrowserModule } from '@angular/platform-browser';
import {Input, NgModule, Output} from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChatWindowComponent } from './components/chat-window/chat-window.component';
import { MessageComponent } from './components/message/message.component';
import {FormsModule} from '@angular/forms';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { LoginComponent } from './components/login/login.component';
import { SocketIoModule, SocketIoConfig, Socket } from 'ngx-socket-io';
import {NgxAutoScrollModule} from 'ngx-auto-scroll';
import { SimplebarAngularModule } from 'simplebar-angular';

const config: SocketIoConfig = { url: 'http://localhost:3030', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    ChatWindowComponent,
    MessageComponent,
    ContactListComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
    SocketIoModule.forRoot(config),
    NgxAutoScrollModule,
    SimplebarAngularModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

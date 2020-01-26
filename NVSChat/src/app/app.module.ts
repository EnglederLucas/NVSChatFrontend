import { MaterialModule } from './material/material.module';
import { BrowserModule } from '@angular/platform-browser';
import {Input, NgModule, Output} from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChatWindowComponent } from './components/chat-window/chat-window.component';
import { MessageComponent } from './components/message/message.component';
import {FormsModule} from '@angular/forms';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { LoginComponent } from './login/login.component';

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
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

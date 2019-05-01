import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { LiveChatComponent } from './live-chat.component';
import { SocketService } from './shared/services/socket.service';
import { DialogUserComponent } from './dialog-user/dialog-user.component';
import {MaterialModule} from '../shared/material/material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [LiveChatComponent, DialogUserComponent],
  providers: [SocketService],
  exports: [
    LiveChatComponent
  ],
  entryComponents: [DialogUserComponent]
})
export class LiveChatModule { }

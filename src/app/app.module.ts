import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatCardModule, MatIconModule, MatToolbarModule, MatButtonModule, MatFormFieldModule, MatInputModule,
  MatSidenavModule, MatTabsModule, MatList, MatListModule, MatDialog, MatDialogModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PresentationComponent } from './presentation/presentation.component';
import { HomeComponent } from './home/home.component';
import {SocketService} from './live-chat/shared/services/socket.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DialogUserComponent} from './live-chat/dialog-user/dialog-user.component';
import {LiveChatModule} from "./live-chat/live-chat.module";




@NgModule({
  declarations: [
    AppComponent,
    PresentationComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FlexLayoutModule,
    MatSidenavModule,
    MatTabsModule,
    MatListModule,
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule,
    LiveChatModule
  ],
  providers: [SocketService, MatDialog],
  entryComponents: [DialogUserComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }

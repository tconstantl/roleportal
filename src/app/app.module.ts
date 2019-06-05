import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatCardModule,
  MatIconModule,
  MatToolbarModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatSidenavModule,
  MatTabsModule,
  MatListModule,
  MatDialog,
  MatDialogModule,
  MatSelectModule,
  MatProgressSpinnerModule,
  MatSlideToggleModule, MatSnackBarModule, MatTableModule, MatTooltipModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PresentationComponent } from './presentation/presentation.component';
import { HomeComponent } from './home/home.component';
import {SocketService} from './live-chat/shared/services/socket.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DialogUserComponent} from './live-chat/dialog-user/dialog-user.component';
import {LiveChatModule} from './live-chat/live-chat.module';
import { NewguyComponent } from './newguy/newguy.component';
import {FirebaseUIModule, firebase, firebaseui} from 'firebaseui-angular';

import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {environment} from '../environments/environment';
import {AuthService} from './shared/services/auth.service';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { BaseStatsDialogComponent } from './presentation/base-stats-dialog/base-stats-dialog.component';
import { SkillDialogComponent } from './presentation/skill-dialog/skill-dialog.component';
import {NgStringPipesModule} from 'angular-pipes';

const firebaseUiAuthConfig: firebaseui.auth.Config = {
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    {
      requireDisplayName: false,
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID
    }
  ],
  credentialHelper: firebaseui.auth.CredentialHelper.ACCOUNT_CHOOSER_COM
};
@NgModule({
  declarations: [
    AppComponent,
    PresentationComponent,
    HomeComponent,
    NewguyComponent,
    MainNavComponent,
    BaseStatsDialogComponent,
    SkillDialogComponent
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
    LiveChatModule,
    MatSelectModule,
    MatButtonModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    FirebaseUIModule.forRoot(firebaseUiAuthConfig),
    LayoutModule,
    MatProgressSpinnerModule,
    FontAwesomeModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatTableModule,
    MatTooltipModule,
    NgStringPipesModule
  ],
  providers: [SocketService, MatDialog, AuthService],
  entryComponents: [DialogUserComponent, BaseStatsDialogComponent, SkillDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }

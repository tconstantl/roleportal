import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LiveChatComponent } from './live-chat/live-chat.component';
import {RouterModule, Routes} from '@angular/router';
import {PresentationComponent} from './presentation/presentation.component';
import {HomeComponent} from './home/home.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }



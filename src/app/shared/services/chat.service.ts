import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PusherService} from './pusher.service';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable()
export class ChatService {
  user: {displayName: string, email: string};
  private _endpoint = 'https://roleportal-chat-server.herokuapp.com';
  private _channel: any;

  constructor(private _pusherService: PusherService, private _http: HttpClient) {
    this._channel = this._pusherService.getPusher().subscribe('chat-group');
  }

  join(param): Observable<any> {
    return this._http.post(this._endpoint + '/join', param)
      .pipe(tap(data => {
        this.user = param;
      }));
  }

  sendMessage(message: string, isCritFail: boolean, isCritSuccess): Observable<any> {
    const param = {
      message,
      type: 'human',
      isCritFail: isCritFail,
      isCritSuccess: isCritSuccess,
      ...this.user
    };
    return this._http.post(this._endpoint + '/message', param);
  }

  getChannel() {
    return this._channel;
  }
}

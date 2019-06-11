import { Injectable } from '@angular/core';
import * as Pusher from 'pusher-js';
import {ifTrue} from 'codelyzer/util/function';

@Injectable()
export class PusherService {
  private _pusher: any;

  constructor() {
    this._pusher = new Pusher('ba8d32df24cb819690de', {
      cluster: 'eu',
      encrypted: true
    });
  }

  getPusher() {
    return this._pusher;
  }
}

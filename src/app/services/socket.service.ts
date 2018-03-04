import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import {apiUrl} from './globals';

@Injectable()
export class SocketService {
  socket;

  constructor() {
    this.socket = io(`${apiUrl}/stomp`);
   }

}

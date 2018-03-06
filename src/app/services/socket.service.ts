import { Injectable } from '@angular/core';
import * as socketIo from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import { apiUrl } from './globals';

const SERVER_URL = `${apiUrl}/stomp`;
@Injectable()
export class SocketService {
  socket;

  constructor() {
    this.initSocket();
  }

  public initSocket(): void {
    this.socket = socketIo(SERVER_URL);
    window['socket'] = this.socket;
  }

  public send(message: any): void {
    this.socket.emit('message', message);
  }

  public onMessage(): any {
    return new Observable<any>(observer => {
      this.socket.on('message', (data: any) => observer.next(data));
    });
  }
}

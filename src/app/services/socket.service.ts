import { Injectable } from '@angular/core';
import * as socketIo from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import { apiUrl } from './globals';

const SERVER_URL = `${apiUrl}`;
@Injectable()
export class SocketService {
  socket;

  constructor() {
    // this.initSocket();
  }

  public initSocket(): void {
    this.socket = socketIo.connect(apiUrl, { path: '/stomp'});
    this.socket.open();
    window['socket'] = this.socket;
    this.socket.on('test', msg => {
      console.log(msg);
    });
    this.socket.on('/topic/cpuLoad', msg => {
      console.log(msg);
    });
    this.socket.on('connect', msg => {
      console.log('connected');
    });
    this.socket.on('error', (error) => {
      console.error(error);
    });
    this.socket.on('connect_error', (error) => {
      console.log(error);
    });
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

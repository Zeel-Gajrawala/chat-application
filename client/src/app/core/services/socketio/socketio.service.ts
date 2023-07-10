import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class SocketioService {
  socket: any;

  constructor() { }

  setupSocketConnection(token: string) {
    this.socket = io(environment.API_ENDPOINT, {
      auth: {
        token: token,
      },
    });
    // this.socket.emit('send message', 'hello from angular');
    // // console.log(this.socket);
    // this.socket.on('received message', (message: string) => {
    //   console.log('received msg', message);

    // })
  }

  receiveMessages(cb: any) {
    if (this.socket) {
      this.socket.on('receive message', (msg: any) => {
        return cb(null, msg);
      });
    }
  }

  sendMessage(sendMessage: { message: string; roomName: string }, cb: any) {
    if (this.socket) {
      this.socket.emit('receive message', sendMessage, cb);
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}

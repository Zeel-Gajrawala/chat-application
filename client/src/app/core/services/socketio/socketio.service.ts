import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Socket, io } from 'socket.io-client';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class SocketioService {
  socket!: Socket;

  constructor() { }

  setupSocketConnection(token: string) {
    this.socket = io(environment.API_ENDPOINT, {
      auth: {
        token: token,
      },
    });
  }

  joinRoom(roomId: string) {
    this.socket.emit('join', roomId);
  }

  receiveMessages(): Observable<any> {
    return new Observable<{ user: string, message: string, type: string }>(observer => {
      this.socket.on('new message', (data: any) => {
        observer.next(data);
      });

      // return () => {
      //   this.disconnect();
      // }
    });
  }

  sendMessage(sendMessage: { user: string, room: string, message: string }) {
    if (this.socket) {
      this.socket.emit('message', sendMessage);
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  storeChat(chatArray: { roomId: string, chat: { userId: string, message: string }[] }[]) {
    localStorage.setItem('chats', JSON.stringify(chatArray));
  }

  getStoredChat() {
    const storage: string = localStorage.getItem('chats')!;
    return storage ? JSON.parse(storage) : [];
  }
}

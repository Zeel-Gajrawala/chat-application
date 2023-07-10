import { AfterViewChecked, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { JwtService } from 'src/app/core/services/jwt/jwt.service';
import { STATUSES } from './model';
import { USERS } from './data';
import { User } from 'src/app/core/models/user';
import { SocketioService } from 'src/app/core/services/socketio/socketio.service';

@Component({
  selector: 'app-chat-app',
  templateUrl: './chat-app.component.html',
  styleUrls: ['./chat-app.component.css']
})
export class ChatAppComponent implements OnInit, AfterViewChecked, OnDestroy {

  statuses = STATUSES;
  activeUser: any;
  users = USERS;
  expandStatuses = false;
  expanded = false;
  currentUser: User = {}

  colorArr: string[] = ['#0000FF', '#6495ED', '#008B8B', '#8a2be2', '#8B008B', '#964B00', '#5F9EA0', '#7B3F00', '#FF7F50', '#8B4000'];

  @ViewChild('scrollMe') private myScrollContainer!: ElementRef;

  constructor(
    private jwtService: JwtService,
    private socketioService: SocketioService
  ) { }

  ngOnInit() {
    this.initialiseSocketConnection();
    this.currentUser = this.jwtService.getTokenPayload();
    this.setUserActive(this.users[0]);
    // this.setUserActive(this.jwtService.getTokenPayload);
    this.scrollToBottom();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  ngOnDestroy(): void {
    this.socketioService.disconnect();
  }

  initialiseSocketConnection() {
    let token: string = this.jwtService.getToken();

    if (token) {
      this.socketioService.setupSocketConnection(token);

      this.socketioService.receiveMessages((err: any, data: any) => {
        console.log('new message', data);

        this.activeUser.messages.push({
          type: 'replies',
          message: data.message
        })
      })
    }
  }

  addNewMessage(inputField: any) {
    const val = inputField.value?.trim()
    if (val.length) {
      this.activeUser.messages.push({ type: 'sent', message: val })
      this.socketioService.sendMessage({ message: val, roomName: 'myRandomChatRoomId' }, (cb: any) => {
        console.log("ACKNOWLEDGEMENT ", cb);

      })
    }
    inputField.value = '';
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }

  setUserActive(user: any) {
    this.activeUser = user;
    // this.connectToWS();
  }

  // connectToWS() {
  // if (this.activeUser.ws && this.activeUser.ws.readyState !== 1) {
  //   this.activeUser.ws = null;
  //   this.activeUser.status = STATUSES.OFFLINE;
  // }
  // if (this.activeUser.ws) {
  //   return;
  // }
  // const ws = new WebSocket('wss://compute.hotelway.ai:4443/?token=TESTTOKEN');
  // this.activeUser.ws = ws;
  // ws.onopen = (event) => this.onWSEvent(event, STATUSES.ONLINE);
  // ws.onclose = (event) => this.onWSEvent(event, STATUSES.OFFLINE);
  // ws.onerror = (event) => this.onWSEvent(event, STATUSES.OFFLINE);
  // ws.onmessage = (result: any) => {
  //   const data = JSON.parse(result?.data || {});
  //   const userFound = this.users.find(u => u.id === data.id);
  //   if (userFound) {
  //     userFound.messages.push(
  //       new Message('replies', data.message)
  //     )
  //   }
  // };
  // }

  // onWSEvent(event, status: STATUSES) {
  //   this.users.forEach(u => u.ws === event.target ? u.status = status : null)
  // }

}

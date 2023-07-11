import { AfterViewChecked, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { JwtService } from 'src/app/core/services/jwt/jwt.service';
import { STATUSES } from './model';
import { USERS } from './data';
import { User } from 'src/app/core/models/user';
import { SocketioService } from 'src/app/core/services/socketio/socketio.service';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-chat-app',
  templateUrl: './chat-app.component.html',
  styleUrls: ['./chat-app.component.css']
})
export class ChatAppComponent implements OnInit, AfterViewChecked, OnDestroy {

  loader: boolean = true;
  statuses = STATUSES;
  activeUser: User = {};
  users = USERS;
  expandStatuses: boolean = false;
  expanded: boolean = false;
  currentUser: User = {};

  @ViewChild('scrollMe') private myScrollContainer!: ElementRef;

  constructor(
    private jwtService: JwtService,
    private socketioService: SocketioService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.initialiseSocketConnection();
    this.currentUser = this.jwtService.getTokenPayload();
    this.getUsers();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  ngOnDestroy(): void {
    this.socketioService.disconnect();
  }

  getUsers() {
    this.userService.getAllUserExceptCurrent().subscribe((res: User[]) => {
      if (res && res.length > 0) {
        this.users = res;
        this.setUserActive(this.users[0]);
        this.scrollToBottom();
      }
      this.loader = false;
    })
  }

  initialiseSocketConnection() {
    let token: string = this.jwtService.getToken();

    if (token) {
      this.socketioService.setupSocketConnection(token);

      this.socketioService.receiveMessages((err: any, data: any) => {
        console.log('new message', data);

        this.activeUser.messages?.push({
          type: 'replies',
          message: data.message
        })
      })
    }
  }

  addNewMessage(inputField: any) {
    const val = inputField.value?.trim()
    if (val.length) {
      this.activeUser.messages?.push({ type: 'sent', message: val })
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

import {
  AfterViewChecked,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { JwtService } from 'src/app/core/services/jwt/jwt.service';
import { User } from 'src/app/core/models/user';
import { SocketioService } from 'src/app/core/services/socketio/socketio.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-chat-app',
  templateUrl: './chat-app.component.html',
  styleUrls: ['./chat-app.component.css'],
})
export class ChatAppComponent implements OnInit, AfterViewChecked, OnDestroy {

  loader: boolean = true;
  users: User[] = [];
  activeUser: User = {};
  currentUser: User = {};
  roomId: string = '';
  messageArr: { userId: string, message: string }[] = [];
  chatArray: { roomId: string, chat: { userId: string, message: string }[] }[] = [];
  inputMessage: string = '';

  @ViewChild('scrollMe') private myScrollContainer!: ElementRef;

  constructor(
    private jwtService: JwtService,
    private socketioService: SocketioService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.initialiseSocketConnection();
    this.currentUser = this.jwtService.getTokenPayload();
    this.getUsers(true);

    this.socketioService
      .receiveMessages()
      .subscribe((data: { user: string, room: string, message: string }) => {

        if (data.room && data.room.length > 0 && data.message != 'user joined') {
          setTimeout(() => {

            this.chatArray = this.socketioService.getStoredChat();
            let index: number = this.chatArray.findIndex((chat) => chat.roomId == data.room);

            if (index > -1) {

              this.chatArray[index].chat.push({
                userId: data.user,
                message: data.message
              });
            } else {

              let newChat: { roomId: string, chat: { userId: string, message: string }[] } = {
                roomId: data.room,
                chat: [{
                  userId: data.user,
                  message: data.message
                }]
              };

              this.chatArray.push(newChat);
            }

            this.socketioService.storeChat(this.chatArray);

            let currentRoomIndex: number = this.chatArray.findIndex((chat) => chat.roomId == this.roomId);
            if (currentRoomIndex > -1) {
              this.messageArr = this.chatArray[currentRoomIndex].chat;
            }
          }, 500);
        }
      });
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  ngOnDestroy(): void {
    this.socketioService.disconnect();
  }

  getUsers(setActiveUser: boolean) {
    this.userService.getAllUserExceptCurrent().subscribe((res: User[]) => {
      if (res && res.length > 0) {
        this.users = res;
        if (setActiveUser) {
          this.setUserActive(this.users[0]);
          this.scrollToBottom();
        }
      }
      this.loader = false;
    });
  }

  setUserActive(user: User) {
    this.activeUser = user;
    this.messageArr = [];

    if (this.activeUser.roomId && this.activeUser.roomId[this.currentUser.user_id!] && this.activeUser.roomId[this.currentUser.user_id!].length > 0) {

      this.roomId = this.activeUser.roomId[this.currentUser.user_id!];
    } else {

      this.roomId = this.generateRoomId();
      this.createRoom({ sender_id: this.currentUser.user_id!, receiver_Id: this.activeUser._id!, roomId: this.roomId });
    }

    this.chatArray = this.socketioService.getStoredChat();
    let index: number = this.chatArray.findIndex((chat) => chat.roomId === this.roomId);

    if (index > -1) {
      this.messageArr = this.chatArray[index].chat;
    }

    this.joinRoom(this.roomId);
  }

  initialiseSocketConnection() {
    let token: string = this.jwtService.getToken();

    if (token) {
      this.socketioService.setupSocketConnection(token);
    }
  }

  joinRoom(roomId: string) {
    this.socketioService.joinRoom(roomId);
  }

  createRoom(roomData: { sender_id: string, receiver_Id: string, roomId: string }) {
    this.userService.createRoom(roomData).subscribe((res: HttpResponse<User[]>) => {
      if (res.status == 201) {
        this.getUsers(false);
      }
    }, (err: HttpErrorResponse) => {
      console.log(err);
    })
  }

  generateRoomId(): string {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < 11) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }

  addNewMessage() {
    if (this.inputMessage && this.inputMessage.length) {

      this.socketioService.sendMessage({
        user: this.currentUser.user_id!,
        room: this.roomId,
        message: this.inputMessage,
      });

      this.chatArray = this.socketioService.getStoredChat();
      let index: number = this.chatArray.findIndex((chat) => chat.roomId === this.roomId);

      if (index > -1) {

        this.chatArray[index].chat.push({
          userId: this.currentUser.user_id!,
          message: this.inputMessage
        });
      } else {

        let newChat: { roomId: string, chat: { userId: string, message: string }[] } = {
          roomId: this.roomId,
          chat: [{
            userId: this.currentUser.user_id!,
            message: this.inputMessage
          }]
        };

        this.chatArray.push(newChat);
      }

      this.socketioService.storeChat(this.chatArray);

      if (index > -1) {
        this.messageArr = this.chatArray[index].chat;
      }
    }
    this.inputMessage = '';
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop =
        this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }
}

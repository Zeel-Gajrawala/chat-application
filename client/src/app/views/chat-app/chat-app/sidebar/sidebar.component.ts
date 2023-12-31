import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/user';
import { JwtService } from 'src/app/core/services/jwt/jwt.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  search: any;

  @Input() activeUser: User = {};
  @Input() users: User[] = [];
  @Input() currentUser: User = {};
  @Input() chatArray: { roomId: string, chat: { userId: string, message: string }[] }[] = [];

  @Output() emitActiveUser: EventEmitter<User> = new EventEmitter<User>();

  colorArr: string[] = ['#0000FF', '#6495ED', '#008B8B', '#8a2be2', '#8B008B', '#964B00', '#5F9EA0', '#7B3F00', '#FF7F50', '#8B4000'];

  constructor(
    private jwtService: JwtService,
    private router: Router
  ) { }

  ngOnInit() { }

  setUserActive(user: User) {
    this.activeUser = user;
    this.emitActiveUser.emit(this.activeUser);
  }

  logout() {
    this.jwtService.clearStorage();
    this.router.navigateByUrl('/auth/login');
  }
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/core/models/user';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  expandStatuses: boolean = false;
  expanded: boolean = false;

  @Input() activeUser: User = {};
  @Input() users: User[] = [];
  @Input() currentUser: User = {};

  @Output() activeUserChange: EventEmitter<User> = new EventEmitter<User>();

  colorArr: string[] = ['#0000FF', '#6495ED', '#008B8B', '#8a2be2', '#8B008B', '#964B00', '#5F9EA0', '#7B3F00', '#FF7F50', '#8B4000'];

  constructor() { }

  ngOnInit() { }

  setUserActive(user: User) {
    this.activeUser = user;
    this.activeUserChange.emit(this.activeUser);
  }

}

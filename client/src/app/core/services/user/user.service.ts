import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAllUserExceptCurrent() {
    return this.http.get<User[]>(`${environment.API_ENDPOINT}api/user/`);
  }

  createRoom(roomData: { sender_id: string, receiver_Id: string, roomId: string }) {
    return this.http.post<User[]>(`${environment.API_ENDPOINT}api/user/room/`, roomData, { observe: 'response' });
  }
}

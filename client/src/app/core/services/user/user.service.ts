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
}

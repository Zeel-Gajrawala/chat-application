import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private ignoreInterceptorHttpClient!: HttpClient;

  constructor(
    private http: HttpClient,
    private httpBackend: HttpBackend
  ) {
    this.ignoreInterceptorHttpClient = new HttpClient(this.httpBackend);
  }

  register(user: User) {
    return this.ignoreInterceptorHttpClient.post<{ token: string }>(`${environment.API_ENDPOINT}api/register`, user);
  }

  login(credentials: Partial<User>) {
    return this.ignoreInterceptorHttpClient.post<{ token: string }>(`${environment.API_ENDPOINT}api/login`, credentials);
  }
}

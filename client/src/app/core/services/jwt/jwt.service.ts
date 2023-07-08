import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  public jwtHelper: JwtHelperService = new JwtHelperService();

  constructor() { }

  getTokenPayload() {
    let token = this.getToken();

    if (token) {
      let payload = JSON.stringify(this.jwtHelper.decodeToken(token));

      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  isLoggedIn() {
    let token = this.getToken();
    return (token && token.length > 0) ? true : false;
  }

  // save Access token
  saveToken(token: string) {
    localStorage.setItem('token', btoa(token));
  }

  // get Access token
  getToken() {
    return atob(localStorage.getItem('token')!);
  }

  // delete Access token
  deleteAccessToken() {
    localStorage.removeItem('access_token');
  }

  //save data in localstorage
  saveDataInStorage(name: string, data: string) {
    localStorage.setItem(name, data);
  }

  //get from data localstorage
  getDataFromStorage(name: string) {
    return localStorage.getItem(name);
  }

  //delete data in localstorage
  deleteInStorage(name: string) {
    localStorage.removeItem(name);
  }

  // clear localStorage
  clearStorage() {
    localStorage.clear();
  }
}

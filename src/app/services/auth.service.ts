// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = false;
  private currentUser: any = null;

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.get<any[]>('http://localhost:3000/users').pipe(
      map(users => users.find(user => user.username === username && user.password === password))
    );
  }

  signup(user: any): Observable<any> {
    return this.http.post('http://localhost:3000/users', user);
  }

  setCurrentUser(user: any) {
    this.loggedIn = true;
    this.currentUser = user;
  }

  logout() {
    this.loggedIn = false;
    this.currentUser = null;
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  isUserAdmin(): boolean {
    return this.currentUser && this.currentUser.role === 'admin';
  }

  getCurrentUser() {
    return this.currentUser;
  }
}

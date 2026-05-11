import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // private apiUrl = 'http://localhost:8080/auth';
  private apiUrl = 'https://expensify-backend-qkkm.onrender.com/auth';

  constructor(private http: HttpClient) {}

  // ✅ REGISTER
  register(data: any): Observable<any> {

    return this.http.post(
      `${this.apiUrl}/register`,
      data
    );

  }

  // ✅ LOGIN
  login(data: any): Observable<any> {

    return this.http.post(
      `${this.apiUrl}/login`,
      data
    );

  }

  // ✅ SAVE JWT TOKEN
  saveToken(token: string): void {

    localStorage.setItem('token', token);

  }

  // ✅ GET TOKEN
  getToken(): string | null {

    return localStorage.getItem('token');

  }

  // ✅ CHECK LOGIN
  isLoggedIn(): boolean {

    return !!localStorage.getItem('token');

  }

  // ✅ LOGOUT
  logout(): void {

    localStorage.clear();

  }

}
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, tap, map, catchError, of } from 'rxjs';

interface LoginResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api'; // Ajuste para IP em vez de localhost
  private tokenKey = 'auth_token';
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient) {}

  private hasToken(): boolean {
    const token = localStorage.getItem(this.tokenKey);
    console.log('AuthService - hasToken:', token);
    return !!token;
  }

  register(data: {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  login(data: { email: string; password: string }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, data).pipe(
      tap((response) => {
        localStorage.setItem(this.tokenKey, response.access_token);
        this.loggedIn.next(true);
      })
    );
  }

  logout(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}`,
    });
    return this.http.post(`${this.apiUrl}/logout`, {}, { headers }).pipe(
      tap(() => {
        localStorage.removeItem(this.tokenKey);
        this.loggedIn.next(false);
      })
    );
  }

  getProfile(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}`,
    });
    return this.http.get(`${this.apiUrl}/profile`, { headers });
  }

  getToken(): string | null {
    const token = localStorage.getItem(this.tokenKey);
    console.log('AuthService - getToken:', token);
    return token;
  }

  isLoggedIn(): Observable<boolean> {
    // Verifica validade do token consultando o backend
    return this.getProfile().pipe(
      map(() => {
        this.loggedIn.next(true);
        return true;
      }),
      catchError(() => {
        this.loggedIn.next(false);
        return of(false);
      })
    );
  }

  getUsers(): Observable<any> {
    const headers = {
      Authorization: `Bearer ${this.getToken()}`,
    };
    return this.http.get(`${this.apiUrl}/users`, { headers });
  }

  deleteUser(id: number): Observable<any> {
    const headers = {
      Authorization: `Bearer ${this.getToken()}`,
    };
    return this.http.delete(`${this.apiUrl}/users/${id}`, { headers });
  }
}

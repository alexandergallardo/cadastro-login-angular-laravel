import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.authService.isLoggedIn().pipe(
      tap((isLoggedIn) => console.log('AuthGuard - isLoggedIn:', isLoggedIn)),
      map((isLoggedIn) => {
        if (isLoggedIn) {
          return true;
        } else {
          console.log('AuthGuard - redirecionando para /login');
          return this.router.createUrlTree(['/login']);
        }
      })
    );
  }
}

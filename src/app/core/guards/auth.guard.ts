import { Injectable, inject } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { AuthState } from '../../store/auth/auth.reducer';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private store = inject(Store<AuthState>);
  private router = inject(Router);

  canActivate(): Observable<boolean | UrlTree> {
    return this.store
      .select((state) => state.auth.logged)
      .pipe(
        map((logged) => (logged ? true : this.router.createUrlTree(['/home'])))
      );
  }
}

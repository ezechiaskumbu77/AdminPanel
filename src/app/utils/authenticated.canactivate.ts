import { UserActionsType } from './../user/login/store/user.actions';
import { Actions, ofType } from '@ngrx/effects';
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { last, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticatedCanActivate implements CanActivate {
  constructor(private store: Store<AppState>, private router: Router) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let token = localStorage.getItem('token');
    if (token != null) return true;
    else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }
}

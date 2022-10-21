import { customEnvironment } from './../../../../environments/custom-environment';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { SetLogedInUser, UserActions, UserActionsType, UserAdded, UsersLoaded } from './user.actions';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class UserEffects {

  constructor(private http: HttpClient, private actions: Actions) { }

  @Effect()
  loginUser = this.actions.pipe(
    ofType(UserActionsType.LOGIN_USER),
    switchMap(
      (action: UserActions) =>
        this.http.post<any>(customEnvironment.BASE_URL + '/auth/login', action.payload, { headers: customEnvironment.headers })
          .pipe(
            switchMap((response: any) => {
              localStorage.setItem("token", response.token);
              localStorage.setItem("user", JSON.stringify(response.user));
              return of(new SetLogedInUser(response.user));
            }
            )
          )
    )
  )

  @Effect()
  loadUser = this.actions.pipe(
    ofType(UserActionsType.LOAD_USERS),
    switchMap(
      (action: UserActions) =>
        this.http.get<any>(customEnvironment.BASE_URL + '/user/?status=' + action.payload, { headers: customEnvironment.headers })
          .pipe(
            switchMap((response: any) => {
              return of(new UsersLoaded(response.data));
            }
            )
          )
    )
  )

  @Effect()
  addUser = this.actions.pipe(
    ofType(UserActionsType.ADD_USER),
    switchMap(
      (action: UserActions) =>
        this.http.post<any>(customEnvironment.BASE_URL + '/user', action.payload, { headers: customEnvironment.headers })
          .pipe(
            switchMap((response: any) => {
              return of(new UserAdded(response.data));
            }
            )
          )
    )
  )
}

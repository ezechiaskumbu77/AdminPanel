import { Actions } from '@ngrx/effects';
import { User } from './../model/user.model';
import { LoginInterface } from '../model/login-interface.model';
import { CollaborationStatusEnum } from 'src/app/model/collaboration-status.enum';

export enum UserActionsType {
  LOGIN_USER = "[user] login",
  SET_LOGED_IN_USER = "[user] set loged in",
  LOAD_USERS = "[user] load",
  USERS_LOADED = "[user] loaded",
  ADD_USER = "[user] add",
  USER_ADDED = "[user] added",
  UPDATE_USER = "[user] update",
  USER_UPDATED = "[user] updated",
  DELETE_USER = "[user] update",
  USER_DELETED = "[user] updated",
  SELECT_USER = "[user] select",
  SET_USER_CATEGORY = "[user] set category"
}

export class SetUserCategory {
  readonly type: string = UserActionsType.SET_USER_CATEGORY
  constructor(public payload: CollaborationStatusEnum) { }
}

export class SelectUser {
  readonly type: string = UserActionsType.SELECT_USER
  constructor(public payload: string) { }
}

export class LoadUsers {
  readonly type: string = UserActionsType.LOAD_USERS
  constructor(public payload: string) { }
}

export class UsersLoaded {
  readonly type: string = UserActionsType.USERS_LOADED

  constructor(public payload: User[]) {
  }
}

export class UserAdded {
  readonly type: string = UserActionsType.USER_ADDED

  constructor(public payload: User) {
  }
}

export class AddUser {
  readonly type: string = UserActionsType.ADD_USER

  constructor(public payload: User) {
  }
}

export class UserLoginAction {
  readonly type: string = UserActionsType.LOGIN_USER

  constructor(public payload: LoginInterface) { }
}

export class SetLogedInUser {
  readonly type: string = UserActionsType.SET_LOGED_IN_USER

  constructor(public payload: User) {
  }
}

export type UserActions =
  UserLoginAction
  | SetLogedInUser
  | LoadUsers
  | UsersLoaded
  | SelectUser
  | SetUserCategory
  | UserAdded
  | AddUser


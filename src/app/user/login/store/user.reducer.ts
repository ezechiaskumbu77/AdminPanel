import { AppState } from 'src/app/app.state';
import { UsersComponent } from 'src/app/granted/users/users.component';
import { CollaborationStatusEnum } from 'src/app/model/collaboration-status.enum';
import { nonDeleted } from 'src/app/utils/non-deleted';
import { sortByEdit, sortByEditInv } from 'src/app/utils/sort-by-edit';
import { User } from '../model/user.model';
import { UserActions, UserActionsType } from './user.actions';

export interface UserState {
  loggedInUser: User,
  token: string,
  users: User[],
  selectedUser: string,
  category: CollaborationStatusEnum
}

export const initialState: UserState = {
  loggedInUser: null,
  token: null,
  users: [],
  selectedUser: null,
  category: CollaborationStatusEnum.AGREED
}

export const selectLogedInUser = (state: AppState) => state.userState.loggedInUser;

export const selectUsers = (state: AppState) => state.userState.users.filter(nonDeleted).sort(sortByEdit);

export const selectSelectedUser = (state: AppState) => {
  let allUsers = state.userState.users;
  let selectedUserId = state.userState.selectedUser;
  let selectedUser = allUsers.find(
    user => user._id.localeCompare(selectedUserId) == 0
  )
  return selectedUser;
}

export function userReducer(
  state: UserState = initialState,
  action: UserActions
) {
  switch (action.type) {
    case UserActionsType.USER_ADDED:
      let usersCopy = state.users.slice();
      usersCopy.push(<User>action.payload)
      state = {...state, users: usersCopy}
      break;
    case UserActionsType.SET_LOGED_IN_USER:
      state = { ...state, loggedInUser: <User>action.payload }
      break;

    case UserActionsType.USERS_LOADED:
      let oc = state.users.slice();
      state = { ...state, users: <User[]>action.payload };
      break;
    case UserActionsType.SELECT_USER:
      state = { ...state, selectedUser: <string>action.payload }
      break;
    case UserActionsType.SET_USER_CATEGORY:
      state = { ...state, category: <CollaborationStatusEnum>action.payload }
      break;
  }
  return state;
}

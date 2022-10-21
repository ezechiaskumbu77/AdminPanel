import { State } from '@ngrx/store';
import { AppState } from '../app.state';
import { GlobalActions, GlobalActionsType } from './global.actions';

export interface GlobalState {
  onProgress: boolean
}

export const initialState: GlobalState = {
  onProgress: false
}

export const SelectOnProgress = (state: AppState) => state.globalState.onProgress;


export function globalReducer(
  state: GlobalState = initialState,
  action: GlobalActions
) {
  switch (action.type) {
    case GlobalActionsType.SET_PROGESS:
      state = { ...state, onProgress: true };
      break;
    case GlobalActionsType.CANCEL_PROGESS:
      state = { ...state, onProgress: false };
      break;
  }
  return state;
}

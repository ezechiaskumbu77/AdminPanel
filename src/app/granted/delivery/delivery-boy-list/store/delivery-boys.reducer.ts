import { DeliveryBoy } from '../../model/delivery-boy.model';
import { AppState } from 'src/app/app.state';
import { CollaborationStatusEnum } from 'src/app/model/collaboration-status.enum';
import { DeliveryBoyActions, DeliveryBoyActionsType } from './delivery-boys.actions';

export interface DeliveryBoyState {
  deliveryBoys: DeliveryBoy[],
  selectedDeliveryBoy: string,
  category: CollaborationStatusEnum,
  availlabilityCategory: boolean;
}

export const initialState: DeliveryBoyState = {
  deliveryBoys: [],
  selectedDeliveryBoy: null,
  category: CollaborationStatusEnum.AGREED,
  availlabilityCategory: true
}


export const selectSelectedDeliveryBoy = (state: AppState) => {
  let allDeliveryBoys = state.deliveryBoyState.deliveryBoys;
  let selectedDeliveryBoyId = state.deliveryBoyState.selectedDeliveryBoy;
  let selectedDeliveryBoy = allDeliveryBoys.find(
    deliveryBoy => deliveryBoy._id.localeCompare(selectedDeliveryBoyId) == 0
  )
  return selectedDeliveryBoy;
}

export function deliveryBoyReducer(
  state: DeliveryBoyState = initialState,
  action: DeliveryBoyActions
) {
  switch (action.type) {

    case DeliveryBoyActionsType.DELIVERY_BOYS_LOADED:
      state = { ...state, deliveryBoys: <DeliveryBoy[]>action.payload, selectedDeliveryBoy: null };
      break;
    case DeliveryBoyActionsType.SELECT_DELIVERY_BOY:
      state = { ...state, selectedDeliveryBoy: <string>action.payload }
      break;
    case DeliveryBoyActionsType.SET_DELIVERY_BOY_CATEGORY:

      state = { ...state, category: <CollaborationStatusEnum>action.payload }
      break;
    case DeliveryBoyActionsType.SET_AVAILLABILITY_CATEGORY:

      state = { ...state, availlabilityCategory: <boolean>action.payload }
      break;
  }
  return state;
}

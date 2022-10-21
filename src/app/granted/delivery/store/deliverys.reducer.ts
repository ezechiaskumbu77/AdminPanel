import { CollaborationStatusEnum } from './../../../model/collaboration-status.enum';
import { AppState } from 'src/app/app.state';
import { DeliveryCorp } from '../model/delivery-corp.model';
import { DeliveryCorpActions, DeliveryCorpActionsType } from './deliverys.actions';
import { DeliveryBoy } from '../model/delivery-boy.model';

export interface DeliveryCorpState {
  deliveryCorps: DeliveryCorp[],
  selectedDeliveryCorp: string,
  category: CollaborationStatusEnum
}

export const initialState: DeliveryCorpState = {
  deliveryCorps: [],
  selectedDeliveryCorp: null,
  category: CollaborationStatusEnum.AGREED
}


export const selectSelectedDeliveryCorp = (state: AppState) => {
  let allDeliveryCorps = state.deliveryCorpState.deliveryCorps;
  let selectedDeliveryCorpId = state.deliveryCorpState.selectedDeliveryCorp;
  let selectedDeliveryCorp = allDeliveryCorps.find(
    deliveryCorp => deliveryCorp._id.localeCompare(selectedDeliveryCorpId) == 0
  )
  return selectedDeliveryCorp;
}
export function deliveryCorpReducer(
  state: DeliveryCorpState = initialState,
  action: DeliveryCorpActions
) {
  switch (action.type) {
    case DeliveryCorpActionsType.DELIVERY_CORPS_LOADED:
      state = { ...state, deliveryCorps: <DeliveryCorp[]>action.payload, selectedDeliveryCorp: null };
      break;
    case DeliveryCorpActionsType.SELECT_DELIVERY_CORP:
      state = { ...state, selectedDeliveryCorp: <string>action.payload }
      break;
    case DeliveryCorpActionsType.SET_DELIVERY_CORP_CATEGORY:
      state = { ...state, category: <CollaborationStatusEnum>action.payload }
      break;
  }
  return state;
}

import { AppState } from 'src/app/app.state';
import { CollaborationStatusEnum } from 'src/app/model/collaboration-status.enum';
import { Shop } from '../model/shop.model';
import { ShopActions, ShopActionsType } from './shops.actions';

export interface ShopState {
  shops: Shop[],
  selectedShop: string,
  category: CollaborationStatusEnum
}

export const initialState: ShopState = {
  shops: [],
  selectedShop: null,
  category: CollaborationStatusEnum.AGREED
}


export const selectSelectedShop = (state: AppState) => {
  let allShops = state.shopState.shops;
  let selectedShopId = state.shopState.selectedShop;
  let selectedShop = allShops.find(
    shop => shop._id.localeCompare(selectedShopId) == 0
  )
  return selectedShop;
}

export function shopReducer(
  state: ShopState = initialState,
  action: ShopActions
) {
  switch (action.type) {
    case ShopActionsType.SHOPS_LOADED:
      let oc = state.shops.slice();
      state = { ...state, shops: <Shop[]>action.payload };
      break;
    case ShopActionsType.SELECT_SHOP:
      state = { ...state, selectedShop: <string>action.payload }
      break;
    case ShopActionsType.SET_SHOP_CATEGORY:
      state = { ...state, category: <CollaborationStatusEnum>action.payload }
      break;
  }
  return state;
}

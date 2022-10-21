import { AppState } from 'src/app/app.state';
import { CollaborationStatusEnum } from 'src/app/model/collaboration-status.enum';
import { nonDeleted } from 'src/app/utils/non-deleted';
import { sortByEdit } from 'src/app/utils/sort-by-edit';
import { ShopSaleOther } from '../model/shop-sale-other.model';
import { ShopSaleOtherActions, ShopSaleOtherActionsType } from './shop-sales-other.actions';

export interface ShopSaleOtherState {
  shopSaleOthers: ShopSaleOther[],
  selectedShopSaleOther: string
}

export const initialState: ShopSaleOtherState = {
  shopSaleOthers: [],
  selectedShopSaleOther: null
}

export const selectShopSaleOthers = (state: AppState) => state.shopSaleOtherState.shopSaleOthers.filter(nonDeleted).sort(sortByEdit);



export const selectSelectedShopSaleOther = (state: AppState) => {
  let allShopSaleOthers = state.shopSaleOtherState.shopSaleOthers;
  let selectedShopSaleOtherId = state.shopSaleOtherState.selectedShopSaleOther;
  let selectedShopSaleOther = allShopSaleOthers.find(
    shopSaleOther => shopSaleOther._id.localeCompare(selectedShopSaleOtherId) == 0
  )
  return selectedShopSaleOther;
}

export function shopSaleOtherReducer(
  state: ShopSaleOtherState = initialState,
  action: ShopSaleOtherActions
) {
  switch (action.type) {
    case ShopSaleOtherActionsType.SHOP_SALE_OTHERS_LOADED:
      state = { ...state, shopSaleOthers: <ShopSaleOther[]>action.payload };
      break;
    case ShopSaleOtherActionsType.SELECT_SHOP_SALE_OTHER:
      state = { ...state, selectedShopSaleOther: <string>action.payload }
      break;
  }
  return state;
}

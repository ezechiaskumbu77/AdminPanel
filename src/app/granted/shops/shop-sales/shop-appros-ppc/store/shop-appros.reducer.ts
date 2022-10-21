import { from } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { Order } from 'src/app/granted/commands/model/order.model';
import { CollaborationStatusEnum } from 'src/app/model/collaboration-status.enum';
import { nonDeleted } from 'src/app/utils/non-deleted';
import { sortByEdit } from 'src/app/utils/sort-by-edit';
import { ShopApprosActions, ShopApprosActionsType } from './shop-appros.actions';

export interface ShopApprosState {
  shopAppros: Order[],
  selectedShopAppros: string,
  dateRange: {
    fromSales: Date,
    toSales: Date
  }
}

export const initialState: ShopApprosState = {
  shopAppros: [],
  selectedShopAppros: null,
  dateRange: null
}

export const selectShopAppros = (state: AppState) => state.shopApprosState.shopAppros.filter(nonDeleted).sort(sortByEdit);

export const selectCurrentDateRange = (state: AppState) => state.shopApprosState.dateRange

export const selectSelectedShopAppros = (state: AppState) => {
  let allShopAppros = state.shopApprosState.shopAppros;
  let selectedShopApprosId = state.shopApprosState.selectedShopAppros;
  let selectedShopAppros = allShopAppros.find(
    shopAppros => shopAppros._id.localeCompare(selectedShopApprosId) == 0
  )
  return selectedShopAppros;
}

export function shopApprosReducer(
  state: ShopApprosState = initialState,
  action: ShopApprosActions
) {
  switch (action.type) {
    case ShopApprosActionsType.SHOP_APPROS_LOADED:
      let oc = state.shopAppros.slice();
      state = { ...state, shopAppros: <Order[]>action.payload };
      break;
    case ShopApprosActionsType.SELECT_SHOP_SALE:
      state = { ...state, selectedShopAppros: <string>action.payload }
      break;
    case ShopApprosActionsType.SET_DATE_RANGE_SALES:
      state = { ...state, dateRange: { fromSales: (<{ from: Date, to: Date }>action.payload).from, toSales: (<{ from: Date, to: Date }>action.payload).to } }
      break;
  }
  return state;
}

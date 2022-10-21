import { from } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { CollaborationStatusEnum } from 'src/app/model/collaboration-status.enum';
import { nonDeleted } from 'src/app/utils/non-deleted';
import { sortByEdit } from 'src/app/utils/sort-by-edit';
import { ShopSale } from '../model/shop-sale.model';
import { ShopSaleActions, ShopSaleActionsType } from './shop-sales.actions';

export interface ShopSaleState {
  shopSales: ShopSale[],
  selectedShopSale: string,
  dateRange: {
    fromSales: Date,
    toSales: Date
  }
}

export const initialState: ShopSaleState = {
  shopSales: [],
  selectedShopSale: null,
  dateRange: null
}

export const selectShopSales = (state: AppState) => state.shopSaleState.shopSales.filter(nonDeleted).sort(sortByEdit);

export const selectCurrentDateRange = (state: AppState) => state.shopSaleState.dateRange

export const selectSelectedShopSale = (state: AppState) => {
  let allShopSales = state.shopSaleState.shopSales;
  let selectedShopSaleId = state.shopSaleState.selectedShopSale;
  let selectedShopSale = allShopSales.find(
    shopSale => shopSale._id.localeCompare(selectedShopSaleId) == 0
  )
  return selectedShopSale;
}

export function shopSaleReducer(
  state: ShopSaleState = initialState,
  action: ShopSaleActions
) {
  switch (action.type) {
    case ShopSaleActionsType.SHOP_SALES_LOADED:
      let oc = state.shopSales.slice();
      state = { ...state, shopSales: <ShopSale[]>action.payload };
      break;
    case ShopSaleActionsType.SELECT_SHOP_SALE:
      state = { ...state, selectedShopSale: <string>action.payload }
      break;
    case ShopSaleActionsType.SET_DATE_RANGE_SALES:
      state = { ...state, dateRange: { fromSales: (<{ from: Date, to: Date }>action.payload).from, toSales: (<{ from: Date, to: Date }>action.payload).to } }
      break;
  }
  return state;
}

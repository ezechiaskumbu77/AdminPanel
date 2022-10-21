import { OrderStatusEnum } from './../model/order.model';
import { act } from '@ngrx/effects';
import { AppState } from 'src/app/app.state';
import { Order } from '../model/order.model';
import { OrderActions, OrderActionsType } from './commands.actions';
import { nonDeleted } from 'src/app/utils/non-deleted';
import { sortByEdit } from 'src/app/utils/sort-by-edit';

export interface OrderState {
  orders: Order[],
  selectedOrder: string,
  category: OrderStatusEnum
}

export const initialState: OrderState = {
  orders: [],
  selectedOrder: null,
  category: OrderStatusEnum.pending
}

export const selectOrders = (state: AppState) => state.orderState.orders.filter(nonDeleted).sort(sortByEdit);


export const selectSelectedOrder = (state: AppState) => {
  let allOrders = state.orderState.orders;
  let selectedOrderId = state.orderState.selectedOrder;
  let selectedOrder = allOrders.find(
    order => order._id.localeCompare(selectedOrderId) == 0
  )
  return selectedOrder;
}

export function orderReducer(
  state: OrderState = initialState,
  action: OrderActions
) {
  switch (action.type) {
    case OrderActionsType.ORDERS_LOADED:
      let oc = state.orders.slice();
      state = { ...state, orders: <Order[]>action.payload, selectedOrder: null };
      break;
    case OrderActionsType.SELECT_ORDER:
      state = { ...state, selectedOrder: <string>action.payload }
      break;
    case OrderActionsType.SET_ORDER_CATEGORY:
      state = { ...state, category: <OrderStatusEnum>action.payload }
      break;
  }
  return state;
}

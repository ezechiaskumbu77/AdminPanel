import { OrderState } from './commands.reducer';
import { Actions } from '@ngrx/effects';
import { Order, OrderStatusEnum } from './../model/order.model';

export enum OrderActionsType {
  LOAD_ORDERS = "[order] load",
  ORDERS_LOADED = "[order] loaded",
  ADD_ORDER = "[order] add",
  ORDER_ADDED = "[order] added",
  UPDATE_ORDER = "[order] update",
  ORDER_UPDATED = "[order] updated",
  DELETE_ORDER = "[order] update",
  ORDER_DELETED = "[order] updated",
  SELECT_ORDER = "[order] select",
  SET_ORDER_CATEGORY = "[order] set category"
}
export class SetOrderCategory {
  readonly type: string = OrderActionsType.SET_ORDER_CATEGORY
  constructor(public payload: OrderStatusEnum) { }
}

export class UpdateOrder {
  readonly type: string = OrderActionsType.UPDATE_ORDER
  constructor(public payload: Order) { }
}

export class OrderUpdated {
  readonly type: string = OrderActionsType.ORDER_UPDATED
  constructor(public payload: Order) { }
}

export class SelectOrder {
  readonly type: string = OrderActionsType.SELECT_ORDER
  constructor(public payload: string) { }
}

export class LoadOrders {
  readonly type: string = OrderActionsType.LOAD_ORDERS
  constructor(public payload: string) { }
}

export class OrdersLoaded {
  readonly type: string = OrderActionsType.ORDERS_LOADED

  constructor(public payload: Order[]) {
  }
}

export type OrderActions =
  LoadOrders
  | OrdersLoaded
  | SelectOrder
  | SetOrderCategory

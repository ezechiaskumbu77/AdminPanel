import { Actions } from '@ngrx/effects';
import { Order } from 'src/app/granted/commands/model/order.model';
import { CollaborationStatusEnum } from 'src/app/model/collaboration-status.enum';

export enum ShopApprosActionsType {
  LOAD_SHOP_APPROS = "[shopAppros] load",
  SHOP_APPROS_LOADED = "[shopAppros] loaded",
  ADD_SHOP_SALE = "[shopAppros] add",
  SHOP_SALE_ADDED = "[shopAppros] added",
  UPDATE_SHOP_SALE = "[shopAppros] update",
  SHOP_SALE_UPDATED = "[shopAppros] updated",
  DELETE_SHOP_SALE = "[shopAppros] update",
  SHOP_SALE_DELETED = "[shopAppros] updated",
  SELECT_SHOP_SALE = "[shopAppros] select",
  SET_SHOP_SALE_CATEGORY = "[shopAppros] set category",
  SET_DATE_RANGE_SALES = "[shopAppros] set date range sale"
}

export class ShopApprosUpdated {
  readonly type: string = ShopApprosActionsType.SHOP_SALE_UPDATED
  constructor(public payload: Order) { }
}

export class UpdateShopAppros {
  readonly type: string = ShopApprosActionsType.UPDATE_SHOP_SALE
  constructor(public payload: Order) { }
}

export class SetShopApprosCategory {
  readonly type: string = ShopApprosActionsType.SET_SHOP_SALE_CATEGORY
  constructor(public payload: CollaborationStatusEnum) { }
}

export class SelectShopAppros {
  readonly type: string = ShopApprosActionsType.SELECT_SHOP_SALE
  constructor(public payload: string) { }
}

export class LoadShopAppros {
  readonly type: string = ShopApprosActionsType.LOAD_SHOP_APPROS
  constructor(public payload: { shop: string, from?: string, to?: string, product?: string | null }) { }
}

export class ShopApprosLoaded {
  readonly type: string = ShopApprosActionsType.SHOP_APPROS_LOADED

  constructor(public payload: Order[]) {
  }
}

export class SetDateRangeSales {
  readonly type: string = ShopApprosActionsType.SET_DATE_RANGE_SALES

  constructor(public payload: { from: Date, to: Date }) {
  }
}

export type ShopApprosActions =
  LoadShopAppros
  | ShopApprosLoaded
  | SelectShopAppros
  | SetShopApprosCategory
  | UpdateShopAppros
  | ShopApprosUpdated
  | SetDateRangeSales

import { ShopState } from './shops.reducer';
import { Actions } from '@ngrx/effects';
import { Shop } from '../model/shop.model';
import { CollaborationStatusEnum } from 'src/app/model/collaboration-status.enum';

export enum ShopActionsType {
  LOAD_SHOPS = "[shop] load",
  SHOPS_LOADED = "[shop] loaded",
  ADD_SHOP = "[shop] add",
  SHOP_ADDED = "[shop] added",
  UPDATE_SHOP = "[shop] update",
  SHOP_UPDATED = "[shop] updated",
  DELETE_SHOP = "[shop] update",
  SHOP_DELETED = "[shop] updated",
  SELECT_SHOP = "[shop] select",
  SET_SHOP_CATEGORY = "[shop] set category"
}

export class ShopUpdated {
  readonly type: string = ShopActionsType.SHOP_UPDATED
  constructor(public payload: Shop) { }
}

export class UpdateShop {
  readonly type: string = ShopActionsType.UPDATE_SHOP
  constructor(public payload: Shop) { }
}

export class SetShopCategory {
  readonly type: string = ShopActionsType.SET_SHOP_CATEGORY
  constructor(public payload: CollaborationStatusEnum) { }
}

export class SelectShop {
  readonly type: string = ShopActionsType.SELECT_SHOP
  constructor(public payload: string) { }
}

export class LoadShops {
  readonly type: string = ShopActionsType.LOAD_SHOPS
  constructor(public payload: string) { }
}

export class ShopsLoaded {
  readonly type: string = ShopActionsType.SHOPS_LOADED

  constructor(public payload: Shop[]) {
  }
}

export type ShopActions =
  LoadShops
  | ShopsLoaded
  | SelectShop
  | SetShopCategory
  | UpdateShop
  | ShopUpdated

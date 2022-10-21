
import { Actions } from '@ngrx/effects';
import { CollaborationStatusEnum } from 'src/app/model/collaboration-status.enum';
import { ShopSaleOther } from '../model/shop-sale-other.model';

export enum ShopSaleOtherActionsType {
  LOAD_SHOP_SALE_OTHERS = "[shopSaleOther] load",
  SHOP_SALE_OTHERS_LOADED = "[shopSaleOther] loaded",
  ADD_SHOP_SALE_OTHER = "[shopSaleOther] add",
  SHOP_SALE_OTHER_ADDED = "[shopSaleOther] added",
  UPDATE_SHOP_SALE_OTHER = "[shopSaleOther] update",
  SHOP_SALE_OTHER_UPDATED = "[shopSaleOther] updated",
  DELETE_SHOP_SALE_OTHER = "[shopSaleOther] update",
  SHOP_SALE_OTHER_DELETED = "[shopSaleOther] updated",
  SELECT_SHOP_SALE_OTHER = "[shopSaleOther] select",
  SET_SHOP_SALE_OTHER_CATEGORY = "[shopSaleOther] set category"
}

export class ShopSaleOtherUpdated {
  readonly type: string = ShopSaleOtherActionsType.SHOP_SALE_OTHER_UPDATED
  constructor(public payload: ShopSaleOther) { }
}

export class UpdateShopSaleOther {
  readonly type: string = ShopSaleOtherActionsType.UPDATE_SHOP_SALE_OTHER
  constructor(public payload: ShopSaleOther) { }
}

export class SetShopSaleOtherCategory {
  readonly type: string = ShopSaleOtherActionsType.SET_SHOP_SALE_OTHER_CATEGORY
  constructor(public payload: CollaborationStatusEnum) { }
}

export class SelectShopSaleOther {
  readonly type: string = ShopSaleOtherActionsType.SELECT_SHOP_SALE_OTHER
  constructor(public payload: string) { }
}

export class LoadShopSaleOthers {
  readonly type: string = ShopSaleOtherActionsType.LOAD_SHOP_SALE_OTHERS
  constructor(public payload: { shop: string, from?: string, to?: string, product?: string | null }) { }
}

export class ShopSaleOthersLoaded {
  readonly type: string = ShopSaleOtherActionsType.SHOP_SALE_OTHERS_LOADED

  constructor(public payload: ShopSaleOther[]) {
  }
}

export type ShopSaleOtherActions =
  LoadShopSaleOthers
  | ShopSaleOthersLoaded
  | SelectShopSaleOther
  | SetShopSaleOtherCategory
  | UpdateShopSaleOther
  | ShopSaleOtherUpdated

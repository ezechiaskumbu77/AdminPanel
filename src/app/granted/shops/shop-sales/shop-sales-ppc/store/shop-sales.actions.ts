
import { Actions } from '@ngrx/effects';
import { CollaborationStatusEnum } from 'src/app/model/collaboration-status.enum';
import { ShopSale } from '../model/shop-sale.model';

export enum ShopSaleActionsType {
  LOAD_SHOP_SALES = "[shopSale] load",
  SHOP_SALES_LOADED = "[shopSale] loaded",
  ADD_SHOP_SALE = "[shopSale] add",
  SHOP_SALE_ADDED = "[shopSale] added",
  UPDATE_SHOP_SALE = "[shopSale] update",
  SHOP_SALE_UPDATED = "[shopSale] updated",
  DELETE_SHOP_SALE = "[shopSale] update",
  SHOP_SALE_DELETED = "[shopSale] updated",
  SELECT_SHOP_SALE = "[shopSale] select",
  SET_SHOP_SALE_CATEGORY = "[shopSale] set category",
  SET_DATE_RANGE_SALES = "[shopSale] set date range sale"
}

export class ShopSaleUpdated {
  readonly type: string = ShopSaleActionsType.SHOP_SALE_UPDATED
  constructor(public payload: ShopSale) { }
}

export class UpdateShopSale {
  readonly type: string = ShopSaleActionsType.UPDATE_SHOP_SALE
  constructor(public payload: ShopSale) { }
}

export class SetShopSaleCategory {
  readonly type: string = ShopSaleActionsType.SET_SHOP_SALE_CATEGORY
  constructor(public payload: CollaborationStatusEnum) { }
}

export class SelectShopSale {
  readonly type: string = ShopSaleActionsType.SELECT_SHOP_SALE
  constructor(public payload: string) { }
}

export class LoadShopSales {
  readonly type: string = ShopSaleActionsType.LOAD_SHOP_SALES
  constructor(public payload: { shop: string, from?: string, to?: string, product?: string | null }) { }
}

export class ShopSalesLoaded {
  readonly type: string = ShopSaleActionsType.SHOP_SALES_LOADED

  constructor(public payload: ShopSale[]) {
  }
}

export class SetDateRangeSales {
  readonly type: string = ShopSaleActionsType.SET_DATE_RANGE_SALES

  constructor(public payload: { from: Date, to: Date }) {
  }
}

export type ShopSaleActions =
  LoadShopSales
  | ShopSalesLoaded
  | SelectShopSale
  | SetShopSaleCategory
  | UpdateShopSale
  | ShopSaleUpdated
  | SetDateRangeSales

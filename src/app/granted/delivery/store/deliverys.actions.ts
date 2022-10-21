import { CollaborationStatusEnum } from 'src/app/model/collaboration-status.enum';
import { DeliveryBoy } from '../model/delivery-boy.model';
import { DeliveryCorp } from '../model/delivery-corp.model';

export enum DeliveryCorpActionsType {
  LOAD_DELIVERY_CORPS = "[deliveryCorp] load",
  DELIVERY_CORPS_LOADED = "[deliveryCorp] loaded",
  ADD_DELIVERY_CORP = "[deliveryCorp] add",
  DELIVERY_CORP_ADDED = "[deliveryCorp] added",
  UPDATE_DELIVERY_CORP = "[deliveryCorp] update",
  DELIVERY_CORP_UPDATED = "[deliveryCorp] updated",
  DELETE_DELIVERY_CORP = "[deliveryCorp] update",
  DELIVERY_CORP_DELETED = "[deliveryCorp] updated",
  SELECT_DELIVERY_CORP = "[deliveryCorp] select",
  SET_DELIVERY_CORP_CATEGORY = "[deliveryCorp] set category"
}

export class SetDeliveryCorpCategory {
  readonly type: string = DeliveryCorpActionsType.SET_DELIVERY_CORP_CATEGORY
  constructor(public payload: CollaborationStatusEnum) { }
}

export class SelectDeliveryCorp {
  readonly type: string = DeliveryCorpActionsType.SELECT_DELIVERY_CORP
  constructor(public payload: string) { }
}

export class LoadDeliveryCorps {
  readonly type: string = DeliveryCorpActionsType.LOAD_DELIVERY_CORPS
  constructor(public payload: string) { }
}

export class DeliveryCorpsLoaded {
  readonly type: string = DeliveryCorpActionsType.DELIVERY_CORPS_LOADED

  constructor(public payload: DeliveryCorp[]) {
  }
}

export type DeliveryCorpActions =
  LoadDeliveryCorps
  | DeliveryCorpsLoaded
  | SelectDeliveryCorp
  | SetDeliveryCorpCategory


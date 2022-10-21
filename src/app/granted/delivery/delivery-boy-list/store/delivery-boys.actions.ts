import { DeliveryBoy } from '../../model/delivery-boy.model';
import { CollaborationStatusEnum } from 'src/app/model/collaboration-status.enum';
import { Delivery } from '../../model/delivery.model';

export enum DeliveryBoyActionsType {
  LOAD_DELIVERY_BOYS = "[deliveryBoy] load",
  DELIVERY_BOYS_LOADED = "[deliveryBoy] loaded",
  ADD_DELIVERY_BOY = "[deliveryBoy] add",
  DELIVERY_BOY_ADDED = "[deliveryBoy] added",
  UPDATE_DELIVERY_BOY = "[deliveryBoy] update",
  DELIVERY_BOY_UPDATED = "[deliveryBoy] updated",
  DELETE_DELIVERY_BOY = "[deliveryBoy] update",
  DELIVERY_BOY_DELETED = "[deliveryBoy] updated",
  SELECT_DELIVERY_BOY = "[deliveryBoy] select",
  SET_DELIVERY_BOY_CATEGORY = "[deliveryBoy] set category",
  SET_AVAILLABILITY_CATEGORY = "[deliveryBoy] set availlability category",
  ADD_DELIVERY = "[delivery] add",
  DELIVERY_ADDED = "[delivery] added",
  UPDATE_DELIVERY = "[delivery] update",
  DELIVERY_UPDATED = "[delivery] updated"
}

export class DeliveryUpdated {
  readonly type: string = DeliveryBoyActionsType.DELIVERY_UPDATED
  constructor(public payload: Delivery) { }
}

export class UpdateDelivery {
  readonly type: string = DeliveryBoyActionsType.UPDATE_DELIVERY
  constructor(public payload: Delivery) { }
}

export class DeliveryAdded {
  readonly type: string = DeliveryBoyActionsType.DELIVERY_ADDED
  constructor(public payload: Delivery) { }
}

export class AddDelivery {
  readonly type: string = DeliveryBoyActionsType.ADD_DELIVERY
  constructor(public payload: Delivery) { }
}

export class SetAvaillabilityCategory {
  readonly type: string = DeliveryBoyActionsType.SET_AVAILLABILITY_CATEGORY
  constructor(public payload: boolean) { }
}

export class SetDeliveryBoyCategory {
  readonly type: string = DeliveryBoyActionsType.SET_DELIVERY_BOY_CATEGORY
  constructor(public payload: CollaborationStatusEnum) { }
}

export class SelectDeliveryBoy {
  readonly type: string = DeliveryBoyActionsType.SELECT_DELIVERY_BOY
  constructor(public payload: string) { }
}

export class LoadDeliveryBoys {
  readonly type: string = DeliveryBoyActionsType.LOAD_DELIVERY_BOYS
  constructor(public payload: {
    category: string,
    availability: boolean
  }) { }
}

export class DeliveryBoysLoaded {
  readonly type: string = DeliveryBoyActionsType.DELIVERY_BOYS_LOADED

  constructor(public payload: DeliveryBoy[]) {
  }
}


export type DeliveryBoyActions =
  LoadDeliveryBoys
  | DeliveryBoysLoaded
  | SelectDeliveryBoy
  | SetDeliveryBoyCategory
  | SetAvaillabilityCategory
  | DeliveryAdded
  | DeliveryUpdated
  | AddDelivery
  | DeliveryAdded

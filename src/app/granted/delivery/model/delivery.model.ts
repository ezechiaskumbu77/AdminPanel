export interface Delivery {
  _id?: string,
  edited?: string,

  shopId?: string,
  OrderId?: string,
  whenAssigned?: string,
  costumerId?: string,
  DeliverdBy?: string,
  delivery?: DeliveryStatus,
  accepted?: boolean
}
export interface DeliveryStatus {
  isDelivered?: boolean,
  whenDelivered?: string,
  isIssue?: string,
  msg?: string
}

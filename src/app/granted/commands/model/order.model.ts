import { HistoricalItem } from 'src/app/model/historical-item';
export interface Order {
  _id?: string,
  WhenMade?: string,
  edited?: string,
  customer?: string,
  status?: string,
  shop?: string,
  paymentMethode?: string,
  IsPayed?: string,
  cart?: any[],
  totalPrice?: string,
  details?: string,
  shippingAdress?: string,
  isDeleted?: string,
  historical?: HistoricalItem[],
  deliverCode?: string
}

export enum OrderStatusEnum {
  pending = 'pending',
  accepted = 'accepted',
  canceled = 'canceled',
  shiped = 'shiped',
  delivered = 'delivered',
  issue = 'issue'
}

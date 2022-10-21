import { deliveryCorpReducer, DeliveryCorpState } from './granted/delivery/store/deliverys.reducer';
import { shopReducer, ShopState } from './granted/shops/store/shops.reducer';
import { orderReducer, OrderState } from './granted/commands/store/commands.reducer';
import { ActionReducerMap } from '@ngrx/store';
import { globalReducer, GlobalState } from './globale-store/global.reducer';
import { userReducer, UserState } from './user/login/store/user.reducer';
import { zoneReducer, ZoneState } from './granted/zones/store/zones.reducer';
import { deliveryBoyReducer, DeliveryBoyState } from './granted/delivery/delivery-boy-list/store/delivery-boys.reducer';
import { shopSaleReducer, ShopSaleState } from './granted/shops/shop-sales/shop-sales-ppc/store/shop-sales.reducer';
import { shopSaleOtherReducer, ShopSaleOtherState } from './granted/shops/shop-sales/shop-sales-others/store/shop-sales-other.reducer';
import { shopApprosReducer, ShopApprosState } from './granted/shops/shop-sales/shop-appros-ppc/store/shop-appros.reducer';
export interface AppState {
  userState: UserState,
  globalState: GlobalState,
  orderState: OrderState,
  shopState: ShopState,
  shopSaleState: ShopSaleState,
  zoneState: ZoneState,
  deliveryCorpState: DeliveryCorpState,
  deliveryBoyState: DeliveryBoyState,
  shopSaleOtherState: ShopSaleOtherState,
  shopApprosState: ShopApprosState
}

export const AppReducer: ActionReducerMap<AppState> = {
  userState: userReducer,
  globalState: globalReducer,
  orderState: orderReducer,
  shopState: shopReducer,
  shopSaleState: shopSaleReducer,
  deliveryCorpState: deliveryCorpReducer,
  zoneState: zoneReducer,
  deliveryBoyState: deliveryBoyReducer,
  shopSaleOtherState: shopSaleOtherReducer,
  shopApprosState: shopApprosReducer
};

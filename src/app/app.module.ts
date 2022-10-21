import { ShopSaleOtherEffects } from './granted/shops/shop-sales/shop-sales-others/store/shop-sales-other.effects';
import { ShopSaleEffects } from './granted/shops/shop-sales/shop-sales-ppc/store/shop-sales.effects';
import { ZoneEffects } from './granted/zones/store/zones.effects';
import { DeliveryCorpEffects } from './granted/delivery/store/deliverys.effects';
import { ShopEffects } from './granted/shops/store/shops.effects';
import { OrderEffects } from './granted/commands/store/commands.effects';
import { HeadersInterceptor } from './utils/Headers.interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GrantedComponent } from './granted/granted.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { LoginComponent } from './user/login/login.component';
import { AppReducer } from './app.state';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './user/login/store/user.effects';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { DashBoardComponent } from './granted/dash-board/dash-board.component';
import { CommandsComponent } from './granted/commands/commands.component';
import { DeliveryComponent } from './granted/delivery/delivery.component';
import { ParamsComponent } from './granted/params/params.component';
import { ShopsComponent } from './granted/shops/shops.component';
import { TicketsComponent } from './granted/tickets/tickets.component';
import { ZonesComponent } from './granted/zones/zones.component';
import { CodeFormaterPipePipe } from './utils/code-formater-pipe.pipe';
import { RemoteShopManagerByIdPipe } from './utils/remote-shop-manager-by-id.pipe';
import { RemoteShopOwnerByIdPipe } from './utils/remote-shop-owner-by-id.pipe';
import { RemoteDeliveryBoysByDeliveryCorpIdPipe } from './utils/remote-delivery-boys-by-delivery-corp-id.pipe';
import { UsersComponent } from './granted/users/users.component';
import { UserRoleToIconPipe } from './utils/user-role-to-icon.pipe';
import { RemoteOfficeByUserIdPipe } from './utils/remote-office-by-user-id.pipe';
import { CollaborationStatusToIconPipe } from './utils/collaboration-status-to-icon.pipe';
import { OfficeCategoryToIconPipe } from './utils/office-category-to-icon.pipe';
import { NgbDateAdapter, NgbDateNativeAdapter, NgbDatepickerModule, NgbDropdown, NgbDropdownModule, NgbModalModule, NgbProgressbarModule, NgbRatingModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { DialogNewZoneComponent } from './granted/zones/dialog-new-zone/dialog-new-zone.component';
import { TownsFromProvincePipe } from './utils/towns-from-province.pipe';
import { VarDirective } from './utils/var.directive';
import { PlaceByIdPipe } from './utils/place-by-id.pipe';
import { GenericConfirmComponent } from './generic-confirm/generic-confirm.component';
import { RemotePoductItemsFomOrderIdPipe } from './utils/remote-poduct-items-fom-order-id.pipe';
import { ProductNameToProductImagePipe } from './utils/product-name-to-product-image.pipe';
import { CommandDurationToIconPipe } from './utils/command-duration-to-icon.pipe';
import { PaiementMethodToIconPipe } from './utils/paiement-method-to-icon.pipe';
import { DialogDeliveryBoyComponent } from './granted/delivery/dialog-delivery-boy/dialog-delivery-boy.component';
import { DeliveryBoyListComponent } from './granted/delivery/delivery-boy-list/delivery-boy-list.component';
import { DeliveryBoyEffects } from './granted/delivery/delivery-boy-list/store/delivery-boys.effects';
import { DeliversFromDeliverBoyIdPipe } from './utils/remote-deliverys-from-deliver-boy-id.pipe';
import { DeliverCorpFromDeliverBoyIdPipe } from './utils/remote-deliver-corp-from-deliver-boy-id.pipe';
import { RemoteZonesFromDeliveryBoyIdPipe } from './utils/remote-zones-from-delivery-boy-id.pipe';
import { RatingMeanPipe } from './utils/rating-mean.pipe';
import { RemoteDeliveryFromOrderIdPipe } from './utils/remote-delivery-from-order-id.pipe';
import { RemoteUserFromIdPipe } from './utils/remote-user-from-id.pipe';
import { CommandDetailsComponent } from './granted/commands/command-details/command-details.component';
import { AgmCoreModule } from '@agm/core/core.module';
import { RemoteOrderFromIdPipe } from './utils/remote-order-from-id.pipe';
import { RemoteShopFromIdPipe } from './utils/remote-shop-from-id.pipe';
import { DialogCancelOrderComponent } from './granted/commands/dialog-cancel-order/dialog-cancel-order.component';
import { ShopDetailsComponent } from './granted/shops/shop-details/shop-details.component';
import { IsTodayPipe } from './utils/is-today.pipe';
import { ShopSalesComponent } from './granted/shops/shop-sales/shop-sales.component';
import { ShopSomaryComponent } from './granted/shops/shop-somary/shop-somary.component';
import { RemoteShopProductByShopIdPipe } from './utils/remote-shop-product-by-shop-id.pipe';
import { RemoteProductByProdutcIdPipe } from './utils/remote-product-by-produtc-id.pipe';
import { RemoteOrderFromShopIdPipe } from './utils/remote-order-from-shop-id.pipe';
import { ShopSalesPpcComponent } from './granted/shops/shop-sales/shop-sales-ppc/shop-sales-ppc.component';
import { ShopSalesOthersComponent } from './granted/shops/shop-sales/shop-sales-others/shop-sales-others.component';
import { ShopApprosPpcComponent } from './granted/shops/shop-sales/shop-appros-ppc/shop-appros-ppc.component';
import { ShopApprosOtherComponent } from './granted/shops/shop-sales/shop-appros-other/shop-appros-other.component';
import { ShopSalesAllComponent } from './granted/shops/shop-sales/shop-sales-all/shop-sales-all.component';
import { RemoteShopProductByShopProductIdPipe } from './utils/remote-shop-product-by-shop-product-id.pipe';
import { TotalSalesPipe } from './utils/total-sales.pipe';
import { RemoteProductStockByIdPipe } from './utils/remote-product-stock-by-id.pipe';
import { RemoteProductsStockByShopIdPipe } from './utils/remote-products-stock-by-shop-id.pipe';
import { ShopApprosAllComponent } from './granted/shops/shop-sales/shop-appros-all/shop-appros-all.component';
import { ShopApprosEffects } from './granted/shops/shop-sales/shop-appros-ppc/store/shop-appros.effects';
import { DialogCreateUserComponent } from './granted/users/dialog-create-user/dialog-create-user.component';
//import { ComplaintsComponent } from './granted/complaints/complaints.component';


const G_MAP_KEY = "AIzaSyB5ysNQHu48pQ2N9D1M1DzZFFqp_b_lwJo"

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    GrantedComponent,
    DashBoardComponent,
    CommandsComponent,
    DeliveryComponent,
    ParamsComponent,
    ShopsComponent,
    TicketsComponent,
    ZonesComponent,
    CodeFormaterPipePipe,
    RemoteShopManagerByIdPipe,
    RemoteShopOwnerByIdPipe,
    RemoteDeliveryBoysByDeliveryCorpIdPipe,
    UsersComponent,
    UserRoleToIconPipe,
    RemoteOfficeByUserIdPipe,
    CollaborationStatusToIconPipe,
    OfficeCategoryToIconPipe,
    DialogNewZoneComponent,
    TownsFromProvincePipe,
    VarDirective,
    PlaceByIdPipe,
    GenericConfirmComponent,
    RemotePoductItemsFomOrderIdPipe,
    ProductNameToProductImagePipe,
    CommandDurationToIconPipe,
    PaiementMethodToIconPipe,
    DialogDeliveryBoyComponent,
    DeliveryBoyListComponent,
    DeliversFromDeliverBoyIdPipe,
    DeliverCorpFromDeliverBoyIdPipe,
    RemoteZonesFromDeliveryBoyIdPipe,
    RatingMeanPipe,
    RemoteDeliveryFromOrderIdPipe,
    RemoteUserFromIdPipe,
    CommandDetailsComponent,
    RemoteOrderFromIdPipe,
    RemoteShopFromIdPipe,
    DialogCancelOrderComponent,
    ShopDetailsComponent,
    IsTodayPipe,
    ShopSalesComponent,
    ShopSomaryComponent,
    RemoteShopProductByShopIdPipe,
    RemoteProductByProdutcIdPipe,
    RemoteOrderFromShopIdPipe,
    ShopSalesPpcComponent,
    ShopSalesOthersComponent,
    ShopApprosPpcComponent,
    ShopApprosOtherComponent,
    ShopSalesAllComponent,
    RemoteShopProductByShopProductIdPipe,
    TotalSalesPipe,
    RemoteProductStockByIdPipe,
    RemoteProductsStockByShopIdPipe,
    ShopApprosAllComponent,
    DialogCreateUserComponent,
    //ComplaintsComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: G_MAP_KEY
    }),
    NgbDropdownModule,
    NgbRatingModule,
    NgbModalModule,
    NgbTooltipModule,
    NgbProgressbarModule,
    NgbDatepickerModule,

    EffectsModule.forRoot([UserEffects, OrderEffects, ShopEffects, ShopSaleEffects, ShopSaleOtherEffects, DeliveryCorpEffects, ZoneEffects, DeliveryBoyEffects, ShopApprosEffects]),
    StoreModule.forRoot(AppReducer),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  entryComponents: [DialogNewZoneComponent, GenericConfirmComponent, DialogDeliveryBoyComponent, DialogCancelOrderComponent, DialogCreateUserComponent],
  providers: [
    NgbDateNativeAdapter,
    PlaceByIdPipe,
    RemoteProductsStockByShopIdPipe,
    RemoteDeliveryFromOrderIdPipe,
    RemoteShopProductByShopIdPipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeadersInterceptor,
      multi: true
    },
    {
      provide: 'AuthenticatedCanActivate',
      useValue: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

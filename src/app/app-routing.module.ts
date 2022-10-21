import { ShopSalesComponent } from './granted/shops/shop-sales/shop-sales.component';
import { ShopSomaryComponent } from './granted/shops/shop-somary/shop-somary.component';
import { ShopDetailsComponent } from './granted/shops/shop-details/shop-details.component';
import { CommandDetailsComponent } from './granted/commands/command-details/command-details.component';
import { ParamsComponent } from './granted/params/params.component';
import { ZonesComponent } from './granted/zones/zones.component';
import { ShopsComponent } from './granted/shops/shops.component';
import { CommandsComponent } from './granted/commands/commands.component';
import { DashBoardComponent } from './granted/dash-board/dash-board.component';
import { GrantedComponent } from './granted/granted.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoginComponent } from './user/login/login.component';
import { AuthenticatedCanActivate } from './utils/authenticated.canactivate';
import { DeliveryComponent } from './granted/delivery/delivery.component';
import { UsersComponent } from './granted/users/users.component';
import { DeliveryBoyListComponent } from './granted/delivery/delivery-boy-list/delivery-boy-list.component';
//import { ComplaintsComponent } from './granted/complaints/complaints.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: 'login', component: LoginComponent },
  {
    path: 'granted',
    component: GrantedComponent,
    canActivate: [AuthenticatedCanActivate],
    children: [
      { path: '', pathMatch: 'full', redirectTo: '/granted/commands' },
      { path: 'dashboard', component: DashBoardComponent },
      { path: 'commands', component: CommandsComponent },
      {
        path: 'commands/:id', component: CommandDetailsComponent
      },

      { path: 'shops', component: ShopsComponent },
      {
        path: 'shops/:id', component: ShopDetailsComponent,
        children: [
          { path: '', pathMatch: 'prefix', redirectTo: './summary' },
          { path: 'summary', component: ShopSomaryComponent },
          { path: 'sales', component: ShopSalesComponent },
        ]
      },
      { path: 'delivery-corps', component: DeliveryComponent },
      { path: 'delivery-boys', component: DeliveryBoyListComponent },

      { path: 'delivery-cars', component: DeliveryComponent },
      { path: 'users', component: UsersComponent },
      //{ path: 'complaints', component: ComplaintsComponent },
      { path: 'zones', component: ZonesComponent },
      {
        path: 'params',
        component: ParamsComponent,
        children: [
          { path: '.', pathMatch: 'full', redirectTo: '/generic' },
          { path: 'generic', component: ParamsComponent },
          { path: 'zones', component: ZonesComponent }
        ]
      },
      { path: '**', redirectTo: '/login', pathMatch: 'full' }
    ]
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthenticatedCanActivate
  ],
})
export class AppRoutingModule { }

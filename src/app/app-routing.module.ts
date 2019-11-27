import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderHistoryComponent } from './orders-history/order-history/order-history.component';
import { PizzaMenuComponent } from './pizzas/pizza-menu/pizza-menu.component';


const routes: Routes = [
  {path: 'Orders', component: OrderHistoryComponent},
  {path: 'pizzamenu', component: PizzaMenuComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

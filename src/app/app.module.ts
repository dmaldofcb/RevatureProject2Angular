import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { OrdersHistoryModule } from './orders-history/orders-history.module';
import { PizzaMenuComponent } from './pizzas/pizza-menu/pizza-menu.component';


@NgModule({
  declarations: [
    AppComponent,
    PizzaMenuComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    OrdersHistoryModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

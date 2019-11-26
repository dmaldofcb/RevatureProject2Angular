import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { OrdersHistoryModule } from './orders-history/orders-history.module';
import { PizzasModule } from './pizzas/pizzas.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    OrdersHistoryModule,
    PizzasModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PizzasModle } from 'src/PizzaModel';
import { OrderModel } from 'src/OrderModel';
import { formatDate } from '@angular/common';
import { PizzaToppingsModel } from 'src/PizzaToppings';
import { OrderDetailsModel } from 'src/OrderDetailsModel';

@Component({
  selector: 'app-pizza-menu',
  templateUrl: './pizza-menu.component.html',
  styleUrls: ['./pizza-menu.component.css']
})
export class PizzaMenuComponent implements OnInit {

  
  response: any;
  postResponse: any;
  responseOrderID: number;
  private responsePizzaID:number;
  toppingsList: any[] = [];
  pizzaList: any[] = [];
  currentPizza: PizzasModle = new PizzasModle();
  pizzaSize: number;
  pizzaCrust: number;
  order: OrderModel = new OrderModel();
  constructor(private http: HttpClient) { 

  }

  ngOnInit() {
    let obs = this.http.get('https://pizzaordersystem.azurewebsites.net/api/PizzaAPI');

    obs.subscribe((response) => {
      this.response = response;
    });
   
  }

  updateTopping(topping: any){

    if(!this.currentPizza.Toppings.includes(topping)){
      this.currentPizza.Toppings.push(topping);
    }
    else{
      let index =this.currentPizza.Toppings.indexOf(topping);
      this.currentPizza.Toppings.splice(index,1);
    }
  }

  setCrust(value: number){
    this.currentPizza.CrustID = +value;
    console.log(value);
  }

  setSize(value: number){
    this.currentPizza.SizeId = +value;
    console.log(value);
  }

  addPizza(){
    console.log("adding pizza");
    this.pizzaList.push(this.currentPizza);
    this.currentPizza = new PizzasModle;
  }

  calculatePrice(PizzaList: PizzasModle){
    return 10.00
  }

  submitOrder(){
    //get order total
    console.log("order sent");
    let price = 0;
    this.pizzaList.forEach(pizza => {
      price = price + this.calculatePrice(pizza);
    });
    //st up order object id default = guest
    this.order.OrderDate = new Date;
    this.order.total = price;
    //post "Guest", date, total to orders
    let obs = this.http.post('https://pizzaordersystem.azurewebsites.net/api/Orders', this.order);
    obs.subscribe((response) => {
      this.postResponse = response;
      console.log(response);
      //get orderId of the new record
      this.responseOrderID = this.postResponse.id;
    })


    //post "custom" sizeid and crustid to pizza table for each pizza
    this.pizzaList.forEach(pizza => {
      obs = this.http.post('https://pizzaordersystem.azurewebsites.net/api/pizzaapi/addpizza', pizza);
      obs.subscribe((response) => {
        this.postResponse = response;
        console.log(response);
        this.responsePizzaID = this.postResponse.id;

        //post each ingredientId pizzaId to pizza toppings
        pizza.Toppings.forEach(topping => {
          let pizzaTopping = new PizzaToppingsModel();
          pizzaTopping.PizzaID = this.responsePizzaID;
          pizzaTopping.ToppingsID = topping.id;
          obs = this.http.post('https://pizzaordersystem.azurewebsites.net/api/ToppingsAPI/AddTopping', pizzaTopping)
          obs.subscribe((response) =>{
            console.log(response);
          })
        });

        //post each pizzaId to orderId totalPrice details
        let orderDetails = new OrderDetailsModel();
        orderDetails.OrderID = this.responseOrderID;
        orderDetails.PizzaID = this.responsePizzaID;
        orderDetails.Price = 10.00;
        obs = this.http.post('https://pizzaordersystem.azurewebsites.net/api/OrderDetails', orderDetails);
        obs.subscribe((response) => {
          console.log(response);
        })

      })
    });
      this.pizzaList = [];
    alert("Succesfully Completed Order");
  }

}

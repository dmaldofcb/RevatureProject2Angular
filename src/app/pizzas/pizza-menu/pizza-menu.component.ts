import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pizza-menu',
  templateUrl: './pizza-menu.component.html',
  styleUrls: ['./pizza-menu.component.css']
})
export class PizzaMenuComponent implements OnInit {

  response: any;
  toppingsList: any[] = [];
  pizzaList: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    let obs = this.http.get('https://pizzaordersystem.azurewebsites.net/api/PizzaAPI');

    obs.subscribe((response) => {
      this.response = response;
    });
   
  }

  updateTopping(topping: any){

    if(!this.toppingsList.includes(topping)){
      this.toppingsList.push(topping);
    }
    else{
      let index =this.toppingsList.indexOf(topping);
      this.toppingsList.splice(index,1);
    }
  }

  addPizza(){
    console.log("submitted");
  }

  submitOrder(){
    console.log("order sent");
  }

}

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit() {
    let obs = this.http.get('https://pizzaordersystem.azurewebsites.net/api/OrderDetails')

    obs.subscribe((response) => console.log(response));
  }

}

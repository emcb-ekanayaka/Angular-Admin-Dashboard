import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  readonly url = "http://localhost:3000/";

  constructor(
    private http:HttpClient
  ) { }

  AddUpdateOrder(Order:any,type:any):Observable<any>{
    if(type=='Add'){
      console.log(Order);
      return this.http.post(this.url+"Order",Order);
    }else{
      return this.http.put(this.url+"Order/"+Order.id,Order);
    }     
  }

  GetAllIOrders():Observable<any>{
    return this.http.get(this.url+"Order");
  }

  DeleteOrderById(ID:any):Observable<any>{
    return this.http.delete(this.url+"Order/"+ID);
  }

  GetOrderById(ID:any):Observable<any>{
    return this.http.get(this.url+"Order/"+ID);
  }
}

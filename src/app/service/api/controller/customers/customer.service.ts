import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  readonly url = "http://localhost:3000/";

  constructor(
    private http:HttpClient
  ) { }

  AddUpdateCustomer(Customer:any,type:any):Observable<any>{
    if(type=='Add'){
      return this.http.post(this.url+"Customer",Customer);
    }else{
      return this.http.put(this.url+"Customer/"+Customer.id,Customer);
    }
      
  }

  GetAllCustomers():Observable<any>{
    return this.http.get(this.url+"Customer");
  }

  DeleteCustomerById(ID:any):Observable<any>{
    return this.http.delete(this.url+"Customer/"+ID);
  }

  GetCustomerById(ID:any):Observable<any>{
    return this.http.get(this.url+"Customer/"+ID);
  }
}

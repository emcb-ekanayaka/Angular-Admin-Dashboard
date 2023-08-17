import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  readonly url = "http://localhost:3000/";

  constructor(
    private http:HttpClient
  ) { }

  AddUpdatePayment(Payment:any,type:any):Observable<any>{
    console.log(Payment.paymenttype);
    
    if(type=='Add'){
      return this.http.post(this.url+"Payment",Payment);
    }else{
      return this.http.put(this.url+"Payment/"+Payment.id,Payment);
    }
      
  }

  GetAllPayments():Observable<any>{
    return this.http.get(this.url+"Payment");
  }

  DeletePaymentById(ID:any):Observable<any>{
    return this.http.delete(this.url+"Payment/"+ID);
  }

  GetPaymentById(ID:any):Observable<any>{
    return this.http.get(this.url+"Payment/"+ID);
  }
}

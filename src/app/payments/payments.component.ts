import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import swal from 'sweetalert';
import { PaymentService } from '../service/api/controller/payments/payment.service';
import { OrderService } from '../service/api/controller/orders/order.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent {

  orders: any;
  paymetForm: any;
  payments: any;

  selectedOrder:any;
  isChageCustomer:boolean=false;
  isChagePayType:boolean=false;

  constructor(
    private http:HttpClient,
    public fb:FormBuilder,
    private orderService:OrderService,
    private service:PaymentService
    ) 
    
    {
    this.paymetForm = this.fb.group({
      paymentcode:[""],
      order:[""],
      payment:[""],
      paymenttype:[""],
      paymentdate:[""],
      id:[]
    })

   }

   

  ngOnInit(): void {
    this.GetAllPayments();
    this.GetAllOrderss();
  }

  GetAllOrderss(){
    this.orderService.GetAllIOrders().subscribe(allData=>{
      this.orders = allData; 
    })
  }

   /** customer change*/
   onChangeOrder(E:any){
    this.isChageCustomer=false;
    this.http.get("http://localhost:3000/Order?id="+E.target.value).subscribe((result:any)=>{
    this.selectedOrder=result;
     
    }) 
   }

   onChangePayType(P:any){
    this.isChagePayType=false;
    this.paymetForm.paymenttype = P.target.value;
    console.log(P.target.value);
    
   }

  /****************  Add Payment *******************/
  SubmitForm(){
    this.paymetForm.value.order =  this.selectedOrder;
    console.log(this.paymetForm.paymenttype);
    
    var type = this.paymetForm.value.id==null?'Add':'Update';
    this.service.AddUpdatePayment(this.paymetForm.value,type).subscribe(data=>{})
 
    if(type=='Add'){
      swal({
        title: "Are you sure?",
        text: "That you want to Add this details?",
        icon: "warning",
        dangerMode: true,
      })
      .then(willDelete => {
        if (willDelete) {
          swal("Sucessfull!", "Payment has been Adedd!", "success");
        }
        this.GetAllPayments();
      });
    }else{
      swal("Sucessfull!", "Payment has been updated!", "success");
      this.GetAllPayments();
  
    }

    this.paymetForm.reset();
    
  }

/****************  Get All Payments *******************/
  GetAllPayments(){
    this.service.GetAllPayments().subscribe(allData=>{
      this.payments = allData; 
    })
  }

  /****************  Delete Payment *******************/
  DeletePaymentById(ID:any){
    swal({
      title: "Are you sure",
      text: "That you want to Delete this Payment?",
      icon: "warning",
      dangerMode: true,
    })
    .then(willDelete => {
      if (willDelete) {
        swal("Deleted!", "Payment has been deleted!", "success");
        this.service.DeletePaymentById(ID).subscribe(allData=>{
          this.GetAllPayments();
        })
      }
    });
  }

  /****************  Get Payment By Id *******************/
  GetPaymentById(ID:any){
    this.isChagePayType=true;
    this.isChageCustomer=true;

    this.service.GetPaymentById(ID).subscribe(allData=>{
      this.selectedOrder = allData.order;
      this.paymetForm.patchValue({
      id:allData.id,
      paymentcode:allData.paymentcode,
      order:allData.order[0].orderid,
      payment:allData.payment,
      paymenttype:allData.paymenttype,
      paymentdate:allData.paymentdate
      })
    })
  }

  searchText="";

}

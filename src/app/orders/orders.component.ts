import { Component } from '@angular/core';
import { ItemService } from '../service/api/controller/items/item.service';
import { FormBuilder } from '@angular/forms';
import { CustomerService } from '../service/api/controller/customers/customer.service';
import { OrderService } from '../service/api/controller/orders/order.service';
import swal from 'sweetalert';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent {

  orderForm:any;

  selectedCustomer:any;
  selectedItems: Array<any> = [];
  itemSelectedId:any;

  items:any;
  customers:any;
  orders: any;

  isEdiOrder:boolean=false;
  isSubmitted:boolean=false;
  isChageCustomer:boolean=true;

  constructor(
    private http:HttpClient,
    public fb:FormBuilder,
    private itemService:ItemService,
    private customerService:CustomerService,
    private orderService:OrderService
    ) 
    { 
    this.orderForm = this.fb.group({
        orderid:[""],
        customer:[""],
        orderdate:[""],
        cost:[""],
        employee:[""],
        item:[""],
        id:[]
      })
    }


  ngOnInit(): void {
      this.GetAllItems();
      this.GetAllCustomers();
      this.GetAllOrders();
  }


   GetAllItems(){
    this.itemService.GetAllItems().subscribe(allData=>{
      this.items = allData;
    })
  }

  GetAllCustomers(){
    this.customerService.GetAllCustomers().subscribe(allData=>{
      this.customers = allData; 
    })
  }

  /** customer change*/
  onChangeCustomer(E:any){
   this.isChageCustomer=false;
   this.http.get("http://localhost:3000/Customer?id="+E.target.value).subscribe((result:any)=>{
    this.selectedCustomer=result;
   }) 
  }

/** item change*/
  onChangeItem(E:any){
    this.itemSelectedId = E.target.value;
  }

  addInnerForm(){
    if(this.isEdiOrder){
      this.isSubmitted=false;
    }else{
      this.isSubmitted=true;
    }
    this.http.get("http://localhost:3000/Item?id="+this.itemSelectedId).subscribe((result:any)=>{
      this.selectedItems.push(result[0]);
    })
  }

  RemovItemById(R:any){
    for(var i=0; i < this.selectedItems.length; i++) {
      if(this.selectedItems[i].id == R )
      {
        this.selectedItems.splice(i,1);
      }
   }
  }


  SubmitForm(){

    this.orderForm.value.customer = this.selectedCustomer;
    this.orderForm.value.item = this.selectedItems;

    var type = this.orderForm.value.id==null?'Add':'Update';
    this.orderService.AddUpdateOrder(this.orderForm.value,type).subscribe(data=>{
    })
    if(type=='Add'){
      swal({
        title: "Are you sure?",
        text: "That you want to Add this details?",
        icon: "warning",
        dangerMode: true,
      })
      .then(willDelete => {
        if (willDelete) {
          swal("Sucessfull!", "Order has been Adedd!", "success");
        }
        this.GetAllOrders();
      });
    }else{
      swal("Sucessfull!", "Order has been updated!", "success");
      this.GetAllOrders();
  
    }
    this.orderForm.reset();
    
  }

  /****************  Get All Orders *******************/
  GetAllOrders(){
    this.orderService.GetAllIOrders().subscribe(allData=>{
      this.orders = allData; 
    })
  }

    /****************  Get Order By Id *******************/
    GetOrderById(ID:any){

        this.isEdiOrder=true;
        this.orderService.GetOrderById(ID).subscribe(allData=>{ 
        this.selectedCustomer = allData.customer;
        this.selectedItems=allData.item;

        this.orderForm.patchValue({
        id:allData.id,
        orderid:allData.orderid,
        customer:allData.customer[0].username,
        orderdate:allData.orderdate,
        cost:allData.cost,
        employee:allData.employee,
        item:allData.item,
        }) 
        
      })
    }

      /****************  Delete Order *******************/
    DeleteOrderById(ID:any){
    swal({
      title: "Are you sure",
      text: "That you want to Delete this Order?",
      icon: "warning",
      dangerMode: true,
    })
    .then(willDelete => {
      if (willDelete) {
        swal("Deleted!", "Order has been deleted!", "success");
        this.orderService.DeleteOrderById(ID).subscribe(allData=>{
          this.GetAllOrders();
        })
      }
    });
  }

  searchText="";

}

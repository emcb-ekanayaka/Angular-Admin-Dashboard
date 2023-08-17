import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CustomerService } from '../service/api/controller/customers/customer.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  customerForm: any;
  customers: any;

  constructor(

    public fb:FormBuilder,
    private service:CustomerService) 
    
    {
    this.customerForm = this.fb.group({
      username:[""],
      email:[""],
      salary:[""],
      id:[]
    })

   }

  ngOnInit(): void {
    this.GetAllCustomers();
  }

  /****************  Add Customer *******************/
  SubmitForm(){
    var type = this.customerForm.value.id==null?'Add':'Update';
    this.service.AddUpdateCustomer(this.customerForm.value,type).subscribe(data=>{})
    if(type=='Add'){
      swal({
        title: "Are you sure?",
        text: "That you want to Add this details?",
        icon: "warning",
        dangerMode: true,
      })
      .then(willDelete => {
        if (willDelete) {
          swal("Sucessfull!", "Customer has been Adedd!", "success");
        }
        this.GetAllCustomers();
      });
    }else{
      swal("Sucessfull!", "Customer has been updated!", "success");
      this.GetAllCustomers();
  
    }
    this.customerForm.reset();
    
  }

/****************  Get All Customers *******************/
  GetAllCustomers(){
    this.service.GetAllCustomers().subscribe(allData=>{
      this.customers = allData; 
    })
  }

  /****************  Delete Customer *******************/
  DeleteCustomerById(ID:any){
    swal({
      title: "Are you sure",
      text: "That you want to Delete this Customer?",
      icon: "warning",
      dangerMode: true,
    })
    .then(willDelete => {
      if (willDelete) {
        swal("Deleted!", "Customer has been deleted!", "success");
        this.service.DeleteCustomerById(ID).subscribe(allData=>{
          this.GetAllCustomers();
        })
      }
    });
  }

  /****************  Get Customer By Id *******************/
  GetCustomerById(ID:any){
    this.service.GetCustomerById(ID).subscribe(allData=>{
      
      this.customerForm.patchValue({
      id:allData.id,
      username:allData.username,
      email:allData.email,
      salary:allData.salary
      })
    })
  }

  searchText="";
    

}

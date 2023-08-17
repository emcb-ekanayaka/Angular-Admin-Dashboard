import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ItemService } from '../service/api/controller/items/item.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent {

  itemForm: any;
  items: any;

  constructor(

    public fb:FormBuilder,
    private service:ItemService) 
    
    {
    this.itemForm = this.fb.group({
      description:[""],
      qty:[""],
      unitprice:[""],
      barcodeimg:[""],
      itemcode:[""],
      id:[]
    })

   }

  ngOnInit(): void {
    this.GetAllItems();
  }

  /****************  Add Item *******************/
  SubmitForm(){
    var type = this.itemForm.value.id==null?'Add':'Update';
    this.service.AddUpdateItem(this.itemForm.value,type).subscribe(data=>{})
    
    if(type=='Add'){
      swal({
        title: "Are you sure?",
        text: "That you want to Add this details?",
        icon: "warning",
        dangerMode: true,
      })
      .then(willDelete => {
        if (willDelete) {
          swal("Sucessfull!", "Item has been Adedd!", "success");
        }
        this.GetAllItems();
      });
    }else{
      swal("Sucessfull!", "Item has been updated!", "success");
      this.GetAllItems();
  
    }

    this.itemForm.reset();
    
  }

/****************  Get All Items *******************/
  GetAllItems(){
    this.service.GetAllItems().subscribe(allData=>{
      this.items = allData; 
    })
  }

  /****************  Delete Item *******************/
  DeleteItemById(ID:any){
    swal({
      title: "Are you sure",
      text: "That you want to Delete this Item?",
      icon: "warning",
      dangerMode: true,
    })
    .then(willDelete => {
      if (willDelete) {
        swal("Deleted!", "Item has been deleted!", "success");
        this.service.DeleteItemById(ID).subscribe(allData=>{
          this.GetAllItems();
        })
      }
    });
  }

  /****************  Get Item By Id *******************/
  GetItemById(ID:any){
    this.service.GetItemById(ID).subscribe(allData=>{
      console.log(ID);
      this.itemForm.patchValue({
      id:allData.id,
      itemcode:allData.itemcode,
      description:allData.description,
      qty:allData.qty,
      unitprice:allData.unitprice,
      barcodeimg:allData.barcodeimg
      })
    })
  }

  searchText="";
    

}

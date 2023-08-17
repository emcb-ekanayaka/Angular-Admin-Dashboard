import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  readonly url = "http://localhost:3000/";

  constructor(
    private http:HttpClient
  ) { }

  AddUpdateItem(Item:any,type:any):Observable<any>{
    if(type=='Add'){
      return this.http.post(this.url+"Item",Item);
    }else{
      return this.http.put(this.url+"Item/"+Item.id,Item);
    }
      
  }

  GetAllItems():Observable<any>{
    return this.http.get(this.url+"Item");
  }

  DeleteItemById(ID:any):Observable<any>{
    return this.http.delete(this.url+"Item/"+ID);
  }

  GetItemById(ID:any):Observable<any>{
    return this.http.get(this.url+"Item/"+ID);
  }
}

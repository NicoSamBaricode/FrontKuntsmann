import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IngredientesService {
  private url= environment.API_URL

  constructor(private http:HttpClient) { }

  public list(id:string){
    return this.http.get(`${this.url}ingredientes/${id}`)
  }

  public create(data:any){
    return this.http.post(`${this.url}ingredientes`,data)
  }

  public update(id:string,data:any){
    return this.http.put(`${this.url}ingredientes/${id}`,data)
  }

  public delete(id:string){
    return this.http.delete(`${this.url}ingredientes/${id}`)
  }
}
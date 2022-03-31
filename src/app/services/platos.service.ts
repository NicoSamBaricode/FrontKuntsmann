import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlatosService {
  private url= environment.API_URL

  constructor(private http:HttpClient) { }

  public list(){
    return this.http.get(`${this.url}platos`)
  }

  public costo(){
    return this.http.get(`${this.url}platos/costo`)
  }

  public listUnidades(){
    return this.http.get(`${this.url}unidades`)
  }

  public listFactores(){
    return this.http.get(`${this.url}unidades/factores`)
  }
  public getOne(id:string){
    return this.http.get(`${this.url}platos/one/${id}`)
  }

  public create(data:any){
    return this.http.post(`${this.url}platos`,data)
  }

  public update(id:string,data:any){
    return this.http.put(`${this.url}platos/${id}`,data)
  }

  public delete(id:string){
    return this.http.delete(`${this.url}platos/${id}`)
  }

  public imagen(id:string){
    return this.http.get(`${this.url}get/imagen/${id}`,{responseType: 'blob'})
  }
}
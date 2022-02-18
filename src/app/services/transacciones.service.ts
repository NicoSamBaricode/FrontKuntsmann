import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransaccionesService {
  private url= environment.API_URL

  constructor(private http:HttpClient) { }

  public list(){
    return this.http.get(`${this.url}transacciones`)
  }

  public create(data:any){
    return this.http.post(`${this.url}transacciones`,data)
  }

  public procesado(id:string,data:any){
    return this.http.post(`${this.url}transacciones/procesado/${id}`,data)
  }

  public venta(id:string,data:any){
    return this.http.post(`${this.url}transacciones/procesado`,data)
  }

  public update(id:string,data:any){
    return this.http.put(`${this.url}transacciones/${id}`,data)
  }

  public delete(id:string){
    return this.http.delete(`${this.url}transacciones/${id}`)
  }
}
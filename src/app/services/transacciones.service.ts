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

  public metodosPagos(){
    return this.http.get(`${this.url}transacciones/metodospagos`)
  }
  public productoList(id : string){
    return this.http.get(`${this.url}transacciones/producto/${id}`)
  }
  public stock(){
    return this.http.get(`${this.url}stock`)
  }
  public stockEtapas(){
    return this.http.get(`${this.url}stock/etapas`)
  }
  public getOne(id:string){
    return this.http.get(`${this.url}transacciones/one/${id}`)
  }

  public create(data:any){
    return this.http.post(`${this.url}transacciones`,data)
  }

  public transferencia(id:string,data:any){
    return this.http.post(`${this.url}transacciones/transferencia/${id}`,data)
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
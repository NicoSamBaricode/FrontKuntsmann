import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private url= environment.API_URL

  constructor(private http:HttpClient) { }

  public list(){
    return this.http.get(`${this.url}productos`)
  }

  public getOne(id:string){
    return this.http.get(`${this.url}productos/one/${id}`)
  }

  public create(data:any){
    return this.http.post(`${this.url}productos`,data)
  }

  public update(id:string,data:any){
    return this.http.put(`${this.url}productos/${id}`,data)
  }

  public delete(id:string){
    return this.http.get(`${this.url}productos/${id}`)
  }
}

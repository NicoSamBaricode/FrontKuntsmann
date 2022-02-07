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
  public getOne(id:string){
    return this.http.get(`${this.url}platos/${id}`)
  }

  public create(data:any){
    return this.http.post(`${this.url}platos`,data)
  }

  public update(id:string,data:any){
    return this.http.put(`${this.url}platos/${id}`,data)
  }

  public delete(id:string){
    return this.http.get(`${this.url}platos/${id}`)
  }

  public imagen(data:any){
    return this.http.post(`${this.url}imagen`,data)
  }
}
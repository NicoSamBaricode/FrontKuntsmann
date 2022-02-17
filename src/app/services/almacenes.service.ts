import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlmacenesService {


  private url= environment.API_URL

  constructor(private http:HttpClient) { }

  public list(){
    return this.http.get(`${this.url}lugar`)
  }

  public getOne(id:string){
    return this.http.get(`${this.url}lugar/one/${id}`)
  }

  public create(data:any){
    return this.http.post(`${this.url}lugar`,data)
  }

  public update(id:string,data:any){
    return this.http.put(`${this.url}lugar/${id}`,data)
  }

  public delete(id:string){
    return this.http.get(`${this.url}lugar/${id}`)
  }
}

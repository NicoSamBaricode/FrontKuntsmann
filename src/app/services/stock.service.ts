import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private url= environment.API_URL

  constructor(private http:HttpClient) { }

  public getOne(id : string){
    return this.http.get(`${this.url}stock/producto/${id}`)
  }
  public stock(){
    return this.http.get(`${this.url}sotck/stock`)
  }
  public stockEtapas(){
    return this.http.get(`${this.url}stock/etapas`)
  }
}
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private url= environment.API_URL

  constructor(private http:HttpClient) { }

  public platosvendidos(){
    return this.http.get(`${this.url}dashboard/platosvendidos`)
  }
  public platosvendidosmes(){
    return this.http.get(`${this.url}dashboard/platosvendidosmes`)
  }
  public itemsstock(){
    return this.http.get(`${this.url}dashboard/itemsstock`)
  }
  public platosmasvendidos(){
    return this.http.get(`${this.url}dashboard/platosmasvendidos`)
  }
  public platosmasvendidoscategorias(){
    return this.http.get(`${this.url}dashboard/platosmasvendidoscategorias`)
  }
  public platosvendidoshistorial(){
    return this.http.get(`${this.url}dashboard/platosvendidoshistorial`)
  }
  public platosvendidoshistorialmes(mes: number){
    return this.http.get(`${this.url}dashboard//platosvendidoshistorialmes/${mes}`)
  }
}

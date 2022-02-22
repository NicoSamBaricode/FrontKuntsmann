import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {

  private url= environment.API_URL

  constructor(private http:HttpClient) { }

  public vencimientos(){
    return this.http.get(`${this.url}notificaciones`)
  }

  public bajoStock(){
    return this.http.get(`${this.url}notificaciones/stock`)
  }
}

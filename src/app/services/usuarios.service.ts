import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private url= environment.API_URL

  constructor(private http:HttpClient) { }

  public list(){
    return this.http.get(`${this.url}usuarios`)
  }

  public listRoles(){
    return this.http.get(`${this.url}usuarios/roles`)
  }

  public create(data:any){
    return this.http.post(`${this.url}usuarios`,data)
  }

  public update(id:string,data:any){
    return this.http.put(`${this.url}usuarios/${id}`,data)
  }

  public delete(id:string){
    return this.http.get(`${this.url}usuarios/${id}`)
  }
}

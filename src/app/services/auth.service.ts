import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {map} from 'rxjs/operators'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = environment.API_URL

  userToken: string = "";

  constructor(private http: HttpClient,
              private router:Router) { 
    this.readToken();
  }


  login(usuario:any){
    const authData = {
      usuario : usuario.Email,
      password : usuario.Password
    }
    return this.http.post(`${this.url}login`,authData)
    .pipe(
      map( (resp:any) =>{
        this.saveToken(resp['resp']);
        return resp;
      })
    )

  }

  logout() {
    localStorage.removeItem('Token');
    localStorage.removeItem('expira');
    this.router.navigate([''])
  }


  private saveToken( token :string){
    this.userToken = token
    localStorage.setItem('Token',this.userToken)

    let hoy = new Date();
    hoy.setSeconds( 3600*8 );
    localStorage.setItem('expira', hoy.getTime().toString() );
  }

  readToken(){
    if (localStorage.getItem('Token'))
    {
      this.userToken = localStorage.getItem('Token')|| '{}';
    }else{
      this.userToken = '';
    }
    return this.userToken;
  }


  isAuthenticated(): boolean{
    if ( this.userToken.length < 2 ) {
      this.logout()
      return false;
    }

    const expira = Number(localStorage.getItem('expira'));
    const expiraDate = new Date();
    expiraDate.setTime(expira);

    if ( expiraDate > new Date() ) {
      return true;
    } else {
      this.logout()
      return false;
    }
  }



}

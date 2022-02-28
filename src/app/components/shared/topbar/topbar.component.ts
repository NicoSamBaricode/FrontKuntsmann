import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { NotificacionesService } from 'src/app/services/notificaciones.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {
  nombre :any = []
  constructor(private auth:AuthService,private usuarioService:UsuariosService, private notificacionesService: NotificacionesService) { }
  navToggle = () => {
    document.getElementById('body').classList.toggle('ms-aside-left-open');
    document.getElementById('ms-side-nav').classList.toggle('ms-aside-open');
    document.getElementById('overlayleft').classList.toggle('d-block');
  }
  optionsToggle = () => {
    document.getElementById('ms-nav-options').classList.toggle('ms-slide-down');
  }

  ngOnInit(): void {
    this.auth.isAuthenticated()
    this.usuarioService.getName()
      .subscribe((response:any) => {
        this.nombre = response.result[0]
      },(err:any)=>{
        console.log(err);
      })
  }

  logout(){
    this.auth.logout()
  }

}

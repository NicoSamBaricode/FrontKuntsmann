import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/services/auth.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { NotificacionesService } from 'src/app/services/notificaciones.service';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {
  nombre :any = []
  public data = [];
  numero = 0;
  tieneNotificacion='';
  estoyEnNotificacion=true;
  constructor(private auth:AuthService,private usuarioService:UsuariosService, private notificacionesService: NotificacionesService,private router: Router) { }
  source: LocalDataSource;

  settings = {
    hideHeader:true,
    hideSubHeader: true,
    pager: {
      perPage: 10,
    },

    columns: {

      tipo: {
        title: 'Tipo Aviso',
        filter: true,
        hide:true
      },

      tipoDetalle: {
        title: 'Tipo Aviso',
        filter: true
      },

      descripcion: {
        title: 'Descripcion',
        filter: true
      },

      producto: {
        title: 'Producto',
        filter: true
        ,hide:true
      },
      producto_id: {
        title: 'Producto_id',
        filter: true,
        hide: true,
      },
      plato_id: {
        title: 'Producto_id',
        filter: true,
        hide: true,
      },
      transaccion_id: {
        title: 'Transaccion_id',
        filter: true,
        hide: true,
      },
      id: {
        title: 'Id',
        filter: true,
        hide: true,
      },


    },
    noDataMessage: 'No hay nuevas notificaciones'

    ,
    delete: {
      confirmDelete: true,

      deleteButtonContent: 'Borrar Fila',
      saveButtonContent: 'Guardar',
      cancelButtonContent: 'Cancelar'
    },

    actions: {
      columnTitle: "Acciones",
      position: "right",

      custom: [
       

        {
          name: 'deleteAction',
          title: '<i class="far fa-trash-alt color-red" title="Borrar Notificacion" ></i>'
        }
      ],
      add: false,
      edit: false,
      delete: false,
      defaultStyle: false
    },

  };
  onUserRowSelect(event): void {
    if (event.data['tipo'] == 'Stock') {
      
      this.router.navigate(['productos-detalle/detalle/' + event.data["producto_id"]]);
    }
    if (event.data['tipo'] == 'Vencimiento') {
      
      this.router.navigate(['/stock-detalle-form/detalle/' + event.data["transaccion_id"]]);
    }
    if (event.data['tipo'] == 'Desactualizado') {
     
      this.router.navigate(['product/add-product/update/' + event.data["plato_id"]]);
    }


  }
  navToggle = () => {
    document.getElementById('body').classList.toggle('ms-aside-left-open');
    document.getElementById('ms-side-nav').classList.toggle('ms-aside-open');
    document.getElementById('overlayleft').classList.toggle('d-block');
  }
  optionsToggle = () => {
    document.getElementById('ms-nav-options').classList.toggle('ms-slide-down');
  }

  ngOnInit(): void {
    
    if (this.router.url=='/notificaciones-list') {
      this.estoyEnNotificacion=false;  
    }
    this.auth.isAuthenticated()
    this.usuarioService.getName()
      .subscribe((response:any) => {
        this.nombre = response.result[0]
      },(err:any)=>{
        console.log(err);
      })

      this.notificacionesService.cantidad()
      .subscribe((response:any) => {
        this.numero = response.result[0].numero_notificaciones;
        if (this.numero==0) {
          this.tieneNotificacion=''
        }
        if (this.numero>0) {
          this.tieneNotificacion='ms-has-notification'
        }
      },(err:any)=>{
        console.log(err);
      })

      this.notificacionesService.list().subscribe(
        (resp: any) => {
  
          let aux = resp.result.map((element) => {
            if(element.tipo == 'Stock'){
              element.tipoDetalle = 'Bajo Stock'
            }
  
            if(element.tipo == 'Vencimiento'){
              element.tipoDetalle = 'Próximo a vencer'
            }
  
            if(element.tipo == 'Desactualizado'){
              element.tipoDetalle = 'Precio desactualizado'
            }
            return element
  
          })
          this.source = new LocalDataSource(aux);
  
        }
      )
  }

  logout(){
    this.auth.logout()
  }
  onCustom(event) {

    if (event.action == 'deleteAction') {
      Swal.fire({
        title: 'Esta por eliminar un aviso',
        text: "Esta seguro?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Borrar!',
        cancelButtonText: 'Cancelar'

      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteAceptado(event.data["id"]);

          Swal.fire(
            'Mensaje eliminado!',
            '',
            'success'
          )
        }
      })



    }
    if (event.action == 'editAction') {
      this.router.navigate(['/usuarios-form/update/' + event.data["id"]]);
    }
    if (event.action == 'detalleAction') {
      if (event.data['tipo'] == 'Stock') {
        alert("entro a stock")
        this.router.navigate(['productos-detalle/detalle/' + event.data["producto_id"]]);
      }
      if (event.data['tipo'] == 'Vencimiento') {
        alert("entro a Vencimiento")
        this.router.navigate(['/stock-detalle-form/detalle/' + event.data["transaccion_id"]]);
      }
    }

  }

  deleteAceptado(id: string) {
    var visto = "visto"
    this.notificacionesService.visto(id, visto).subscribe(
      (resp: any) => {
        this.ngOnInit();
      }, error => {
        console.log(error);
      }

    )
  }
}

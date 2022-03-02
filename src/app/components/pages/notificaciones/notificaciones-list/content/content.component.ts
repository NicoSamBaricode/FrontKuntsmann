import { Component, OnInit, ViewChild } from '@angular/core';
import data from '../../../../../data/usuarios.json';
import { LocalDataSource } from 'ng2-smart-table';
import { NotificacionesService } from 'src/app/services/notificaciones.service';
import Swal, { SweetAlertOptions } from 'sweetalert2';

import { Router } from '@angular/router';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  // Table
  public data = data;
  constructor(private notificacionesService: NotificacionesService, private router: Router) {

  }

  source: LocalDataSource;
  settings = {

    hideSubHeader: true,
    pager: {
      perPage: 10,
    },

    columns: {

      tipo: {
        title: 'asdads',
        filter: true,
        hide: true
      },
      tipoDetalle: {
        title: 'Tipo Aviso',
        filter: true
      },
      producto: {
        title: 'Producto',
        filter: true,
        hide: true
      },

      descripcion: {
        title: 'Descripcion',
        filter: true
      },
      plato: {
        title: 'Plato',
        filter: true,
        hide: true
      },
      producto_id: {
        title: 'Producto_id',
        filter: true,
        hide: true,
      },
      plato_id: {
        title: 'Plato_id',
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
          name: 'detalleAction',
          title: '<i class="fa fa-plus-circle" title="Detalles" ></i>'
        },

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

  onSearch(query: string = '') {
    if (query.length == 0) {

      this.source.reset();
    } else {
      this.source.setFilter([
        // fields we want to include in the search

        {
          field: 'nombre',
          search: query
        },
        {
          field: 'mensaje',
          search: query
        },

      ], false);
    }
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
      
        this.router.navigate(['productos-detalle/detalle/' + event.data["producto_id"]]);
      }
      if (event.data['tipo'] == 'Vencimiento') {
        
        this.router.navigate(['/stock-detalle-form/detalle/' + event.data["transaccion_id"]]);
      }
      if (event.data['tipo'] == 'Desactualizado') {
       
        this.router.navigate(['product/add-product/update/' + event.data["plato_id"]]);
      }
    }

  }

  ngOnInit(): void {
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

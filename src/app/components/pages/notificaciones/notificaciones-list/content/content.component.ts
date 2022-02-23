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

      nombre: {
        title: 'Nombre',
        filter: true
      },
      mensaje: {
        title: 'Mensaje',
        filter: true
      },
     

    },
    noDataMessage:'No se encontraron Mensajes'

    ,
    delete: {
      confirmDelete: true,

      deleteButtonContent: 'Borrar Fila',
      saveButtonContent: 'Guardar',
      cancelButtonContent: 'Cancelar'
    },
   
    actions: {
      columnTitle:"Acciones",
      position: "right",
      
      custom: [

       
        {
          name: 'deleteAction',
          title: '<i class="far fa-trash-alt color-red" title="delete" ></i>'
        }
      ],
      add: false,
      edit: false,
      delete: false,
      defaultStyle:false
    },
  };
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
            'Mensaje eliminado con exito!',
            '',
            'success'
          )
        }
      })



    }
    if (event.action == 'editAction') {
      this.router.navigate(['/usuarios-form/update/' + event.data["id"]]);
    }

  }

  ngOnInit(): void {
    this.notificacionesService.list().subscribe(
      (resp: any) => {        
        
        let aux = resp.result.map((element)=>{
          if (element.estado==0) {
            element.estado='Inactivo'
           return element
            
          }else{
            element.estado='Activo'
            return element
          }
          
        })
        this.source = new LocalDataSource(aux);
      }
    )
  }
  deleteAceptado(id: string) {
    this.notificacionesService.delete(id).subscribe(
      (resp: any) => {
        this.ngOnInit();
      }, error => {
        console.log(error);
      }

    )
  }

}

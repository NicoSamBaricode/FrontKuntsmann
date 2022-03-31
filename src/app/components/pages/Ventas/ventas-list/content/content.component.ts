import { Component, OnInit, ViewChild } from '@angular/core';
import jwt from 'jwt-decode';

import { VentasService } from 'src/app/services/ventas.service';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { Router } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  // Table
  rol: number;
  constructor(private ventasService: VentasService, private router: Router) {
    this.rol = jwt(localStorage.getItem('Token'))["rol"];
  }

  source: LocalDataSource;
  source2: LocalDataSource;
  settings = {
    hideSubHeader: true,
    pager: {
      perPage: 10,
    },
    noDataMessage:'Ninguna Venta Encontrada',
    columns: {
      
      id: {
        title: 'Id',
        filter: true
      },
      articulo_id: {
        title: 'Articulo Num',
        filter: true
      },
      categoria: {
        title: 'Categoria',
        filter: true
      },
      descripcion: {
        title: 'Articulo',
        filter: true
      },
     cantidad: {
        title: 'Cantidad',
        filter: true
      },
      precio: {
        title: 'Precio',
        filter: true
      },
      costo: {
        title: 'Costo',
        filter: true
      },
      margen: {
        title: 'Rentabilidad',
        filter: true
      },
      creado: {
        title: 'Fecha',
        filter: true
      },



    },
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
          title: '<i class="far fa-trash-alt color-red" title="Anular" ></i>'
        }
      ],
      add: false,
      edit: false,
      delete: false,
      defaultStyle: false
    },
  };
  settingsRestringido = {
    hideSubHeader: true,
    pager: {
      perPage: 10,
    },
    noDataMessage:'Ninguna Venta Encontrada',
    columns: {
      
      id: {
        title: 'Id',
        filter: true
      },
      articulo_id: {
        title: 'Articulo Num',
        filter: true
      },
      categoria: {
        title: 'Categoria',
        filter: true
      },
      descripcion: {
        title: 'Articulo',
        filter: true
      },
     cantidad: {
        title: 'Cantidad',
        filter: true
      },
      precio: {
        title: 'Precio',
        filter: true
      },
      costo: {
        title: 'Costo',
        filter: true
      },
      margen: {
        title: 'Rentabilidad',
        filter: true
      },
      creado: {
        title: 'Fecha',
        filter: true
      },



    },
    delete: {
      confirmDelete: true,

      deleteButtonContent: 'Borrar Fila',
      saveButtonContent: 'Guardar',
      cancelButtonContent: 'Cancelar'
    },
    actions: {
      columnTitle: "Acciones",
      position: "right",

      hide:true,
      add: false,
      edit: false,
      delete: false,
      defaultStyle: false
    },
  };
  settings2 = {
    hideSubHeader: true,
    pager: {
      perPage: 1000000000,
    },
    noDataMessage:'Ninguna Venta Encontrada',
    columns: {
      
      id: {
        title: 'Id',
        filter: true
      },
      articulo_id: {
        title: 'Articulo Num',
        filter: true
      },
      categoria: {
        title: 'Categoria',
        filter: true
      },
      descripcion: {
        title: 'Articulo',
        filter: true
      },
     cantidad: {
        title: 'Cantidad',
        filter: true
      },
      precio: {
        title: 'Precio',
        filter: true
      },
      costo: {
        title: 'Costo',
        filter: true
      },
      margen: {
        title: 'Rentabilidad',
        filter: true
      },
      creado: {
        title: 'Fecha',
        filter: true
      },



    },
    delete: {
      confirmDelete: true,

      deleteButtonContent: 'Borrar Fila',
      saveButtonContent: 'Guardar',
      cancelButtonContent: 'Cancelar'
    },
    actions: {
      columnTitle: "Acciones",
      position: "right",      
      add: false,
      edit: false,
      delete: false,
      defaultStyle: false,
      hide:true,
      
    },
  };
  onSearch(query: string = '') {
    if (query.length == 0) {

      this.source.reset();
    } else {
      this.source.setFilter([
        // fields we want to include in the search

        {
          field: 'descripcion',
          search: query
        },
        {
          field: 'categoria',
          search: query
        },
        {
          field: 'id',
          search: query
        },


      ], false);
      this.source2.setFilter([
        // seteo el filtro para la tabla 2

        {
          field: 'descripcion',
          search: query
        },
        {
          field: 'categoria',
          search: query
        },
        {
          field: 'id',
          search: query
        },


      ], false);

    }
  }
  onCustom(event) {

 
    if (event.action == 'deleteAction') {
      Swal.fire({
        title: 'Esta por eliminar un registro',
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
            'Registro eliminado con exito!',
            '',
            'success'
          )
        }
      })



    }
    

  }

  ngOnInit(): void {
    this.ventasService.list().subscribe(
      (resp: any) => {
        this.source = new LocalDataSource(resp.result);
        this.source2 = new LocalDataSource(resp.result);
      }
    )
  }

  deleteAceptado(id: string) {
    this.ventasService.delete(id).subscribe(
      (resp: any) => {
        this.ngOnInit();
      }, error => {
        if(error.status==403){
        Swal.fire({
          title: 'Error',
          text: 'No se puede eliminar una venta ya anulada',
        })
      }
      else{
        Swal.fire({
          title: 'Error',
          text: 'No se pudo eliminar el registro',
        })
      }
    }
    )
  }
   
}

import { Component, OnInit, ViewChild } from '@angular/core';
import jwt from 'jwt-decode';
import { PlatosService } from 'src/app/services/platos.service';
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
  constructor(private platosService: PlatosService, private router: Router ) {
    this.rol = jwt(localStorage.getItem('Token'))["rol"];
  }

  source: LocalDataSource;
  source2: LocalDataSource;
  settings = {
    hideSubHeader: true,
    pager: {
      perPage: 10,
    },

    columns: {
      id: {
        title: 'Id',
        filter: true,
        hide: true
      },
      articulo_id: {
        title: 'Id',
        filter: true,
       
      },
      descripcion: {
        title: 'Articulo',
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
          name: 'detalleAction',
          title: '<i class="fa fa-plus-circle" title="Detalles" ></i>'
        },
        {
          name: 'editAction',
          title: '<i class="far fa-edit" title="Editar"></i>'
        },
        {
          name: 'deleteAction',
          title: '<i class="far fa-trash-alt color-red" title="Borrar" ></i>'
        },
        
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

    columns: {
      id: {
        title: 'Id',
        filter: true,
        hide: true
      },
      articulo_id: {
        title: 'Id',
        filter: true,
       
      },
      descripcion: {
        title: 'Articulo',
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
          name: 'detalleAction',
          title: '<i class="fa fa-plus-circle" title="Detalles" ></i>'
        },
       
        
      ],
      add: false,
      edit: false,
      delete: false,
      defaultStyle: false
    },
  };
  settings2 = {
    hideSubHeader: true,
    pager: {
      perPage: 1000000000000,
    },

    columns: {
      id: {
        title: 'Id',
        filter: true,
        hide: true
      },
      articulo_id: {
        title: 'Id',
        filter: true,
       
      },
      descripcion: {
        title: 'Articulo',
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



    },
    delete: {
      confirmDelete: true,

      deleteButtonContent: 'Borrar Fila',
      saveButtonContent: 'Guardar',
      cancelButtonContent: 'Cancelar'
    },
    actions: {
      hide:true,
      add: false,
      edit: false,
      delete: false,
      defaultStyle: false
    },
  };
  onSearch(query: string = '') {
    if (query.length == 0) {

      this.source.reset();
      this.source2.reset();
    } else {
      this.source.setFilter([
        // fields we want to include in the search

        {
          field: 'descripcion',
          search: query
        },
        {
          field: 'id',
          search: query
        },


      ], false);
      this.source2.setFilter([
        // fields we want to include in the search

        {
          field: 'descripcion',
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
    if (event.action == 'editAction') {
      this.router.navigate(['product/add-product/update/' + event.data["id"]]);
    }
    if (event.action == 'detalleAction') {
      this.router.navigate(['product-detalle/detalle/' + event.data["id"]]);
    }

  }

  ngOnInit(): void {
    this.platosService.list().subscribe(
      (resp: any) => {
        this.source = new LocalDataSource(resp.result);
        this.source2= new LocalDataSource(resp.result);
      }
    )
  }

  deleteAceptado(id: string) {
    this.platosService.delete(id).subscribe(
      (resp: any) => {
        this.ngOnInit();
      }, error => {
        console.log(error);
      }

    )
  }

}

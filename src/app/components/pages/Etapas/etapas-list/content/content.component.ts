import { Component, OnInit,ViewChild } from '@angular/core';

import { EtapasService } from 'src/app/services/etapas.service';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  // Table
  
  constructor(private etapasService: EtapasService, private router:Router) {

  }
  
  source: any;  
  settings = {
    hideSubHeader: true,
    pager: {
      perPage:10,
    },

    columns: {

      descripcion: {
        title: 'Nombre',
        filter: true
      },
      lugar: {
        title: 'Ubicacion',
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
      columnTitle:"Acciones",
      position: "right",
      
      custom: [

        {
          name: 'editAction',
          title: '<i class="far fa-edit" title="Edit"></i>'
        },
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
          field: 'Descripcion',
          search: query
        },
       

      ], false);

      console.log(query, this.source);

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
      this.router.navigate(['/etapas-form/update/'+event.data["id"]]);
    }

  }

  ngOnInit(): void {
    this.etapasService.list().subscribe(
      (resp: any) => {
        this.source = resp.result;
        
        console.log(this.source);
      }
    )
  }
  deleteAceptado(id:string){
    this.etapasService.delete(id).subscribe(
      (resp: any) => {
        this.ngOnInit();
      },error => {
        console.log(error);
      }
      
    )
  }

}

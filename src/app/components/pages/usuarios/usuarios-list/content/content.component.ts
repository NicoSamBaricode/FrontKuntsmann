import { Component, OnInit,ViewChild } from '@angular/core';
import data from '../../../../../data/usuarios.json';
import { LocalDataSource } from 'ng2-smart-table';
import { UsuariosService } from 'src/app/services/usuarios.service';
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
  public data = data;
  constructor(private usuariosService: UsuariosService, private router:Router) {

  }
  @ViewChild('successSwal') public successSwal: SwalComponent;
  Step1: SweetAlertOptions = {
    title: 'Esta por eliminar un usuario',
    text: "Esta seguro?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, Borrar!'
  };
  // Opciones del Swal exitoso
  Step2: SweetAlertOptions = {
    title: 'Usuario Borrado!',
    icon: 'success',
    text: ''
  };
  deleteQuestion() {
   
  };
  source: any;  
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
      apellido: {
        title: 'Apellido',
        filter: true
      },
      rol: {
        title: 'Tipo',
        filter: true
      },
      estado: {
        title: 'Status',
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
          field: 'Nombre',
          search: query
        },
        {
          field: 'Apellido',
          search: query
        },

      ], false);

      console.log(query, this.source);

    }
  }
  onCustom(event) {
    if (event.action == 'deleteAction') { 
      Swal.fire({
        title: 'Esta por eliminar un usuario',
        text: "Esta seguro?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Borrar!',
        cancelButtonText: 'Cancelar'

      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteAceptado(event.data["user_id"]);
          
          Swal.fire(
            'Usuario eliminado con exito!',
            '',
            'success'
          )
        }
      })
      
        
      
    }
    if (event.action == 'editAction') {
      this.router.navigate(['/usuarios-form/update/'+event.data["user_id"]]);
    }

  }

  ngOnInit(): void {
    this.usuariosService.list().subscribe(
      (resp: any) => {
        this.source = resp.result;
        this.source = this.source.map((element)=>{
          if (element.estado==0) {
            element.estado='Inactivo'
           return element
            
          }else{
            element.estado='Activo'
            return element
          }
          
        })
        console.log(this.source);
      }
    )
  }
  deleteAceptado(id:string){
    this.usuariosService.delete(id).subscribe(
      (resp: any) => {
        this.ngOnInit();
      },error => {
        console.log(error);
      }
      
    )
  }

}

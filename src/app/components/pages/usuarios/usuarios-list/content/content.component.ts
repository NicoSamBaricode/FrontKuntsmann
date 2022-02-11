import { Component, OnInit } from '@angular/core';
import data from '../../../../../data/usuarios.json';
import { LocalDataSource } from 'ng2-smart-table';
import { UsuariosService } from 'src/app/services/usuarios.service';
@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
// Table
public data = data;
constructor(private usuariosService: UsuariosService) {

}
source: LocalDataSource;
settings = {
  hideSubHeader: true,
  pager:{
    perPage:10,
  },
  
  columns: {
    
    imagen: {
      title: 'Image',
      type: 'html',
      valuePrepareFunction: (imagen: number) => {
        return `<img src="${imagen[0]}" alt="img" />`;
      },
      filter: true
    },
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
  },
};
onSearch(query: string = '') {
  if (query.length==0) {

    this.source.reset();
  }else{
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
  if (event.action=='deleteAction') {
    alert("borro");
  }
  if (event.action=='editAction') {
    alert("edito");
  }
  
}

  ngOnInit(): void {
    this.usuariosService.list().subscribe(
    (resp:any)=>{
        this.source=resp.result;
        console.log(this.source);
    }
      )
  }

}

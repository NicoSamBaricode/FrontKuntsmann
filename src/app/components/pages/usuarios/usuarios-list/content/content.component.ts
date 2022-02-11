import { Component, OnInit } from '@angular/core';
import data from '../../../../../data/usuarios.json';
import { LocalDataSource } from 'ng2-smart-table';
@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
// Table
public data = data;
constructor() {
  this.source = new LocalDataSource(this.data);
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
    Nombre: {
      title: 'Nombre',
      filter: true
    },
    Apellido: {
      title: 'Apellido',
      filter: true
    },
    Tipo: {
      title: 'Tipo',
      filter: true
    },
    Estado: {
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
        title: '<i class="far fa-trash-alt color-red" title="delete"></i>'
      }
    ],
    add: false,
    edit: false,
    delete: false,
  },
};
onSearch(query: string = '') {
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

onCustom(event) {
  alert(event)
}

  ngOnInit(): void {
  }

}

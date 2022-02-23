import { Component, OnInit, ViewChild } from '@angular/core';
import data from '../../../../../data/usuarios.json';
import { LocalDataSource } from 'ng2-smart-table';
import { TransaccionesService } from 'src/app/services/transacciones.service';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  // Table
  public data = data;
  update = false // para saber si es crear o actualizar
  titulo="Movimientos de Stock Historico"
  constructor(private transaccionesService: TransaccionesService, private router: Router, private activatedRoute: ActivatedRoute) {

  }
  
  
  source: LocalDataSource;  
  settings = {
    hideSubHeader: true,
    pager: {
      perPage: 10,
    },

    columns: {

      id: {
        title: 'Identificador',
        filter: true
      },
      producto: {
        title: 'Producto',
        filter: true
      },
      marca: {
        title: 'Marca',
        filter: true,
        
      },
      lote: {
        title: 'Lote',
        filter: true,
        
      },numeroComprobante: {
        title: 'Comprobante',
        filter: true,

      },      
      cantidad: {
        title: 'Cantidad',
        filter: true,

      },
      unidad: {
        title: 'Unidad',
        filter: true,

      },fechaIngreso: {
        title: 'Ingreso',
        filter: true,

      },
      fechaVencimiento: {
        title: 'Vencimiento',
        filter: true,

      },
      etapa: {
        title: 'Etapa',
        filter: true,

      },
      tipo: {
        title: 'Tipo',
        filter: true,

      },
      usuario: {
        title: 'Usuario',
        filter: true,

      }

    },
    

    actions: {
      columnTitle:"Acciones",
      position: "right",
      
      custom: [

        {
          name: 'editAction',
          title: '<i class="fas fa-share-square " title="Mover Stock"></i>',

        },
        {
          name: 'deleteAction',
          title: '<i class="fas fa-plus-square" title="Detalles" ></i>'
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
          field: 'id',
          search: query
        },
        {
          field: 'producto',
          search: query
        },
        {
          field: 'marca',
          search: query
        },
        {
          field: 'numeroComprobante',
          search: query
        },
        {
          field: 'etapa',
          search: query
        },
        {
          field: 'usuario',
          search: query
        },
        {
          field: 'tipo',
          search: query
        },

      ], false);
    }
  }
  onCustom(event) {
    if (event.action == 'deleteAction') {
      this.router.navigate(['/stock-form/update/' + event.data["id"]]);

    }
    if (event.action == 'editAction') {
      this.router.navigate(['/transferenciaStock-form/' + event.data["id"]]);
    }

  }

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params; // para obtener la id del usuario

    if (params.id) {
      this.titulo = "Detalle de movimientos por producto"
      this.transaccionesService.productoList(params.id).subscribe(
        (resp: any) => {        
          
          let aux = resp.result
          this.source = new LocalDataSource(aux);
        }
      )
    } else {
      this.transaccionesService.list().subscribe(
        (resp: any) => {        
          
          let aux = resp.result
          this.source = new LocalDataSource(aux);
        }
      )
    }
    
  }
 
}

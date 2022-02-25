import { Component, OnInit, ViewChild } from '@angular/core';
import data from '../../../../../data/usuarios.json';
import { LocalDataSource } from 'ng2-smart-table';
import { TransaccionesService } from 'src/app/services/transacciones.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  // Table
  public data = data;
  constructor(private transaccionesService: TransaccionesService, private router: Router) {

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
        title: 'Identificador',
        filter: true
      },
      producto: {
        title: 'Producto',
        filter: true
      },
      
            
      cantidad: {
        title: 'Cantidad',
        filter: true,
        type: 'html',
      },
      unidad: {
        title: 'Unidad',
        filter: true,

      }      
     
      
    },
    

    actions: {
      columnTitle:"Acciones",
      position: "right",
      
      custom: [

                {
          name: 'detalleAction',
          title: '<i class="fas fa-plus-square" title="Detalles" ></i>'
        }
      ],
      add: false,
      edit: false,
      delete: false,
      defaultStyle:false
    },
  };
  settings2 = {
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
      
            
      cantidad: {
        title: 'Cantidad',
        filter: true,
        type: 'html',

      },
      unidad: {
        title: 'Unidad',
        filter: true,

      } ,
      etapa: {
        title: 'Etapa',
        filter: true,

      }      
     
      
    },
    

    actions: {
      columnTitle:"Acciones",
      position: "right",
      
      custom: [

        
        {
          name: 'detallesAction',
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
  onSearch2(query: string = '') {
    if (query.length == 0) {

      this.source2.reset();
    } else {
      this.source2.setFilter([
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
          field: 'etapa',
          search: query
        },
        
        

      ], false);
    }
  }
  onCustom(event) {
   
    if (event.action == 'detalleAction') {
      this.router.navigate(['/stock-list/detalle/' + event.data["producto_id"]]);
    }

  }
  onCustom2(event) {
   
    if (event.action == 'detallesAction') {
     
      this.router.navigate(['/stock-list/detalle/' + event.data["producto_id"]]);
    }

  }

  ngOnInit(): void {
    this.transaccionesService.stock().subscribe(
      (resp: any) => {        
        
        let aux = resp.result.map((item) => {
          if (item.cantidad<=0){
            
            item.cantidad=`<div class="rojito" id="gato">Sin Stock por aprox: ${Math.abs(item.cantidad)}</div>`
          }
          return item;
        })
        this.source = new LocalDataSource(aux);
      }
    )

    this.transaccionesService.stockEtapas().subscribe(
      (resp: any) => {        
        
        let aux = resp.result.map((item) => {
          if (item.cantidad<=0){
            item.cantidad=`<div class="rojito">Sin Stock por aprox: ${Math.abs(item.cantidad)}</div>`
          }
          return item;
        })
        this.source2 = new LocalDataSource(aux);
      }
    )
  }
 
}

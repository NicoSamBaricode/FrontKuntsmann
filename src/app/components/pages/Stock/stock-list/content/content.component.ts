import { Component, OnInit, ViewChild } from '@angular/core';
import data from '../../../../../data/usuarios.json';
import { LocalDataSource } from 'ng2-smart-table';
import { TransaccionesService } from 'src/app/services/transacciones.service';
import Swal from 'sweetalert2';
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
  source2: LocalDataSource; 
  settings = {
    hideSubHeader: true,
    pager: {
      perPage: 10,
    },

    columns: {
      transaccion_id: {
        title: 'n° Transacción',
        filter: true,
        
      },
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
        },
        {
          name: 'editarAction',
          title: '<i class="fas fa-edit" title="Editar" ></i>'
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
      perPage: 1000000000000,
    },

    columns: {
      transaccion_id: {
        title: 'n° Transacción',
        filter: true,
        
      },
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

      },
      estado: {
        title: 'estado',
        filter: true,
        hide:true,
      },
     

    },
    

    actions: {
      hide:true,
      columnTitle:"Acciones",
      position: "right",
      
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
        }
        

      ], false);
    }
  }
  onCustom(event) {
    if (event.action == 'deleteAction') {
      this.router.navigate(['/stock-detalle-form/detalle/' + event.data["id"]]);

    }
    if (event.action == 'editAction') {
      this.router.navigate(['/transferenciaStock-form/' + event.data["id"]]);
    }
    if (event.action == 'editarAction') {
      if (event.data['estado']==1) {
        this.router.navigate(['/stock-editar/' + event.data["id"]]);
      }else{
        Swal.fire({
          title: 'Atencion',
          text: 'No se puede editar, ya existe un movimiento registrado',
          icon: 'warning',
        })
      }
            
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
          this.source2 = new LocalDataSource(aux);
        }
      )
    } else {
      this.transaccionesService.list().subscribe(
        (resp: any) => {        
          
          let aux = resp.result
          this.source = new LocalDataSource(aux);
          this.source2 = new LocalDataSource(aux);
        }
      )
    }
    
  }
 
}

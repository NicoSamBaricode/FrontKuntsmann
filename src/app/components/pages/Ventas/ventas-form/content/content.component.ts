import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { PlatosService } from 'src/app/services/platos.service';
import { VentasService } from 'src/app/services/ventas.service';
import Swal from 'sweetalert2';
import { LocalDataSource } from 'ng2-smart-table';
@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  defaultForm: FormGroup;
  articulos: any = []
  guardarV = ''
  constructor(private platosServices: PlatosService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private ventasService: VentasService) {

  }
  source: LocalDataSource;
  settings = {
    hideSubHeader: true,
    pager: {
      perPage: 10,
    },
    noDataMessage: 'Ninguna Venta Agregada',
    mode: external,
    columns: {


      plato_id: {
        
        filter: true,
        hide: true
      },
      articulo_id: {
        title: 'Id',
        filter: true,
        
      },
      plato_id_traducida: {
        title: 'Menu / Articulo',
        filter: true

      },
      cantidad: {
        title: 'Cantidad',
        filter: true
      },


    },
    delete: {

      deleteButtonContent: '<i class="far fa-trash-alt color-red" title="delete" ></i> ',

    },
    actions: {
      columnTitle: "Acciones",
      position: "right",


      add: false,
      edit: false,
      delete: true,
      defaultStyle: false
    },
  };
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
          // this.deleteAceptado(event.data["id"]);
          console.log(event.source.data)
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
    // Default Form
    this.source = new LocalDataSource();
    this.defaultForm = new FormGroup({
      plato_id: new FormControl('', [ //aca el nombre tiene que coincidir con el nombre la columna de la base
        Validators.required,
        Validators.minLength(2),
      ]),
      cantidad: new FormControl('', [ //aca el nombre tiene que coincidir con el nombre la columna de la base
        Validators.required,
        Validators.minLength(1),
      ]),
      plato_id_traducida: new FormControl('', [ //aca el nombre tiene que coincidir con el nombre la columna de la base
      
    ]),
    articulo_id: new FormControl('', [ //aca el nombre tiene que coincidir con el nombre la columna de la base
      
  ]),

    }

    );

    this.platosServices.list()
      .subscribe((response: any) => {
        
        this.articulos = response.result;
      }, (err: any) => {
        console.log(err);
      }
      )
  }

  guardar(guardarV) {
    this.guardarV = guardarV

  }
  guardarABase() {
    
    let data = [];
    this.source.getAll().then(value => {
      value.forEach(element => {
        delete element.plato_id_traducida
        delete element.articulo_id
        data.push(element);
      });
      
      this.ventasService.createManual(data)
        .subscribe(response => {
          console.log(response)
          this.router.navigate(['ventas-list']);
        }, error => {
          console.log(error);
          // if (error.error.descripcion === 'ER_DUP_ENTRY') {
          //   Swal.fire({
          //     title: 'Atencion',
          //     text: 'Ya existe ',
          //     icon: 'warning',
          //   })
          // } else {
          Swal.fire({
            title: 'Atencion',
            // text: 'Contactar al servicio técnico Baricode ' + error.error.descripcion,
            icon: 'error',
          })
          // }

        });

    });
  }

  onSubmit() {
    
    if (this.guardarV == 'agregar') {
      let aux = this.articulos.filter((element:any) => {

        return element.id == this.defaultForm.controls['plato_id'].value

      })

       this.defaultForm.controls['plato_id_traducida'].setValue(aux[0].descripcion)
       this.defaultForm.controls['articulo_id'].setValue(aux[0].articulo_id)
      this.source.append(this.defaultForm.value)
      this.defaultForm.reset()

    }

  }

}
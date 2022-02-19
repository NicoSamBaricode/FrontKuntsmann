import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { IngredientesService } from 'src/app/services/ingredientes.service';
import { PlatosService } from 'src/app/services/platos.service';
import { ProductosService } from 'src/app/services/productos.service';
import { TransaccionesService } from 'src/app/services/transacciones.service';
import { AlmacenesService } from 'src/app/services/almacenes.service';
import { ProveedoresService } from 'src/app/services/proveedores.service';
import { EtapasService } from 'src/app/services/etapas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  id = null
  defaultForm: FormGroup;
  unidades: any = []
  ingredientes: any = []
  etapas: any = []
  proveedores: any = []
  almacenes: any = []
  productos: any = []
  items: any = []
  update = false // para saber si es crear o actualizar
  titulo = "Agregar"
  constructor(private platosService: PlatosService,
    private transaccionesService: TransaccionesService,
    private productosService: ProductosService,
    private ingredientesService: IngredientesService,
    private almacenesService: AlmacenesService,
    private proveedoresService: ProveedoresService,
    private etapasService: EtapasService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {

  }
  
  ngOnInit(): void {
    // Default Form

    const params = this.activatedRoute.snapshot.params;

    if (params.id) {
      this.id = params.id;
      this.titulo = "Modificar"
      this.getData(params.id)
      this.update = true
    } else {
      this.update = false
    }

    this.defaultForm = new FormGroup({
      descripcion: new FormControl(null, [
        Validators.required,
        Validators.minLength(4),
      ]),
      producto_id: new FormControl(null, [
        Validators.required,
        Validators.minLength(1),
      ]),
      remito: new FormControl(null, [


      ]),
      marca: new FormControl(null, [

      ]),
      fechaIngreso: new FormControl(null, [
        
      ]),
      fechaVencimiento: new FormControl(null, [
        
      ]),
      fechaComprobante: new FormControl(null, [
        
      ]),
      numeroComprobante: new FormControl(null, [
        
      ]),
      lote: new FormControl(null, [
        
      ]),
      proveedor_id: new FormControl(null, [
        
      ]),
      cantidad: new FormControl(null, [
        
      ]),
      almacen: new FormControl(null, [
        
      ]),
      etapa: new FormControl(null, [
        
      ]),
      costo: new FormControl(null, [
      ]),
      
      precio: new FormControl(null, [
        Validators.required
      ]),
     
    },

    );
    this.productosService.list()
      .subscribe((response: any) => {
        this.productos = response.result;
      }, (err: any) => {
        console.log(err);
      }
      )
      this.etapasService.list()
      .subscribe((response: any) => {
        this.etapas = response.result;
      }, (err: any) => {
        console.log(err);
      }
      )
      this.almacenesService.list()
      .subscribe((response: any) => {
        this.almacenes = response.result;
      }, (err: any) => {
        console.log(err);
      }
      )
      this.proveedoresService.list()
      .subscribe((response: any) => {
        this.proveedores = response.result;
      }, (err: any) => {
        console.log(err);
      }
      )
    this.platosService.listUnidades()
      .subscribe((response: any) => {
        this.unidades = response.result;
      }, (err: any) => {
        console.log(err);
      }
      )
  }


  onSubmit() {

    if (this.update || this.id) {

      this.platosService.update(this.activatedRoute.snapshot.params.id, this.defaultForm.value)
        .subscribe((response: any) => {
          this.router.navigate(['/product/product-list']);
        }, err => {
          console.log(err);
          Swal.fire({
            title: 'Atencion',
            text: 'No se puede guardar' + err.error.descripcion,
            icon: 'warning',
          })
        })

    } else {

      this.platosService.create(this.defaultForm.value)
        .subscribe(response => {
          this.router.navigate(['/product/product-list']);
        }, error => {
          console.log(error);
          if (error.error.descripcion === 'ER_DUP_ENTRY') {
            Swal.fire({
              title: 'Atencion',
              text: 'Ya existe ',
              icon: 'warning',
            })
          } else {
            Swal.fire({
              title: 'Atencion',
              text: 'Contactar al servicio técnico Baricode ' + error.error.descripcion,
              icon: 'error',
            })
          }

        });
    }

  }

  getData(id: string) {
    this.platosService.getOne(id)
      .subscribe((response: any) => {
        let data = response.result[0]
        console.log(data);
        this.items = response.ingredientes;
        this.defaultForm.controls["descripcion"].setValue(data["descripcion"]);
        this.defaultForm.controls["articulo_id"].setValue(data["articulo_id"]);
        this.defaultForm.controls["imagen"].setValue(data["imagen"]);
        this.defaultForm.controls["info"].setValue(data["info"]);
        this.defaultForm.controls["preparacion"].setValue(data["preparacion"]);
        this.defaultForm.controls["costo"].setValue(data["costo"]);
        this.defaultForm.controls["precio"].setValue(data["precio"]);
        this.defaultForm.controls["margen"].setValue(data["margen"]);
        this.defaultForm.controls["auto"].setValue(data["auto"]);
      }, error => {
        console.log(error);
        Swal.fire({
          title: 'Atencion',
          text: 'No hay conexion con base de datos' + error.error.descripcion,
          icon: 'warning',
        })
      });
  }
  agregarIngredientes() {
    if (this.id) {
      this.addItem()
    } else {
      this.platosService.create(this.defaultForm.value)
        .subscribe((response: any) => {
          this.id = response['id'];
          this.addItem()
        }, error => {
          console.log(error);
          if (error.error.descripcion === 'ER_DUP_ENTRY') {
            Swal.fire({
              title: 'Atencion',
              text: 'Ya existe ',
              icon: 'warning',
            })
          } else {
            Swal.fire({
              title: 'Atencion',
              text: 'Contactar al servicio técnico Baricode ' + error.error.descripcion,
              icon: 'error',
            })
          }

        });
    }


  }

  eliminar_ingrediente(id: string) {
    this.ingredientesService.delete(id)
      .subscribe((response: any) => {
        this.getData(this.id);
      }, (err: any) => {
        console.log(err);
      });
  }



  addItem() {
    if (!!this.ingredientes.producto_id && !!this.ingredientes.cantidad && !!this.ingredientes.unidad) {

      let ji = { "plato_id": this.id, "producto_id": this.ingredientes.producto_id, "cantidad": this.ingredientes.cantidad, "unidad": this.ingredientes.unidad }

      this.ingredientesService.create(ji)
        .subscribe((response: any) => {
          this.platosService.update(this.id, this.defaultForm.value)
            .subscribe((response: any) => {
              this.getData(this.id);
            }, err => {
              console.log(err);
              Swal.fire({
                title: 'Atencion',
                text: 'No se puede guardar' + err.error.descripcion,
                icon: 'warning',
              })
            })

        }, (err: any) => {
          console.log(err)
        }
        )



    } else {
      Swal.fire({
        title: 'Atencion',
        text: 'Debe llenar ingrediente, cantidad y unidad',
        icon: 'warning',
      })
    }

  }




}

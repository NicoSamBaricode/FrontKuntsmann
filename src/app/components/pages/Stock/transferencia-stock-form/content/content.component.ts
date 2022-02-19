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
  
  
  etapas: any = []
  
  almacenes: any = []
 
  items: any = []
  update = false // para saber si es crear o actualizar
  
  constructor(private platosService: PlatosService,
    private transaccionesService: TransaccionesService,
    private productosService: ProductosService,
    
    private almacenesService: AlmacenesService,
    
    private etapasService: EtapasService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {

  }
  
  ngOnInit(): void {
    // Default Form
    
    const params = this.activatedRoute.snapshot.params; 
      this.getData(params.id) 
    
    

    this.defaultForm = new FormGroup({
      descripcion: new FormControl(null, [
        Validators.required,
        Validators.minLength(4),
      ]),
      producto_id: new FormControl(null, [
        Validators.required,
        Validators.minLength(1),
      ]),
      
      marca: new FormControl(null, [

      ]),
      unidad: new FormControl(null, [

      ]),
      cantidadTotal: new FormControl(null, [

      ]),
      cantidadEfectiva: new FormControl(null, [

      ]),
     
      lote: new FormControl(null, [
        
      ]),
      
      cantidad: new FormControl(null, [
        
      ]),
      almacen: new FormControl(null, [
        
      ]),
      etapa: new FormControl(null, [
        
      ]),
      
      
     
    },

    );
    
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
    this.transaccionesService.getOne(id)
      .subscribe((response: any) => {
        let data = response.result[0]
        console.log(data);
        this.items = response.ingredientes;
        this.defaultForm.controls["marca"].setValue(data["marca"]);
        this.defaultForm.controls["producto_id"].setValue(data["producto_id"]);
        this.defaultForm.controls["descripcion"].setValue(data["descripcion"]);
        this.defaultForm.controls["unidad"].setValue(data["unidad"]);
        this.defaultForm.controls["cantidadTotal"].setValue(data["cantidadTotal"]);
        this.defaultForm.controls["cantidadEfectiva"].setValue(data["cantidadEfectiva"]);
        this.defaultForm.controls["cantidad"].setValue(data["cantidad"]);
        this.defaultForm.controls["lote"].setValue(data["lote"]);
        this.defaultForm.controls["almacen"].setValue(data["almacen"]);
        this.defaultForm.controls["etapa"].setValue(data["etapa"]);

      }, error => {
        console.log(error);
        Swal.fire({
          title: 'Atencion',
          text: 'No hay conexion con base de datos' + error.error.descripcion,
          icon: 'warning',
        })
      });
  }

 

}

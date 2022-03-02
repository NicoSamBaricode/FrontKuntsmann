import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
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
  tipo_proveedores: any = []
  almacenes: any = []
  productos: any = []
  items: any = []
  update = false // para saber si es crear o actualizar
  titulo = "Agregar"

  fileData: File = null;
  previewImagen = null;

  valor:any =''


  constructor(private platosService: PlatosService,
              private transaccionesService: TransaccionesService,
              private productosService: ProductosService,
              private almacenesService: AlmacenesService,
              private proveedoresService: ProveedoresService,
              private etapasService: EtapasService,
              private router: Router,
  ) {

  }
  
  ngOnInit(): void {
    // Default Form


    this.defaultForm = new FormGroup({
      descripcion: new FormControl(null, [
        
      ]),
      producto_id: new FormControl(null, [
        Validators.required,
        Validators.minLength(1),
      ]),
      remito: new FormControl(null, [

      ]),
      marca: new FormControl(null, [
        Validators.required,
      ]),
      fechaIngreso: new FormControl(null, [
        Validators.required,
      ]),
      fechaVencimiento: new FormControl(null, [
        Validators.required,
      ]),
      fechaComprobante: new FormControl(null, [
        
      ]),
      numeroComprobante: new FormControl(null, [
        
      ]),
      lote: new FormControl(null, [
        Validators.required,
      ]),
      proveedor_id: new FormControl(null, [
        Validators.required,
      ]),
      cantidad: new FormControl(null, [
        Validators.required,
      ]),
      almacen: new FormControl(null, [
        Validators.required,
      ]),
      etapa: new FormControl(null, [
        Validators.required,
      ]),

      unidad: new FormControl(null, [
        
      ]),
     
      costo: new FormControl(null, [
        Validators.required
      ]),
      proveedor_tipo_pago: new FormControl(null, [
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
      this.transaccionesService.metodosPagos()
      .subscribe((response: any) => {
        this.tipo_proveedores= response.result;
      },err=>{
        console.log(err)
      })

  }
 
 
 
 
   cambioUnidades(valor){
 
  this.defaultForm.controls["unidad"].setValue(this.productos[valor.split(",")[1]].unidad_id);
  
  this.valor=valor

 }


 uploadFile(file:any) {  
  this.fileData = <File>file.target.files[0];
  if(this.fileData){
  const reader = new FileReader();

  reader.onload = (file:any) => {
    this.previewImagen = file.target.result;

   
  }
  reader.readAsDataURL(<File>file.target.files[0])
}
  
}





  onSubmit() {
    
    this.defaultForm.controls["producto_id"].setValue(this.valor.split(",")[0]);



            ////////////////////////

            const formData = new FormData();

            let datosJson= this.defaultForm.getRawValue();
        
            formData.append('data', JSON.stringify( datosJson));
            if(this.fileData){
              formData.append('remito', this.fileData);
            }
            
        
        //////////////////////////




      this.transaccionesService.create(formData)
        .subscribe(response => {
         
        this.router.navigate(['/stock-list']);
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

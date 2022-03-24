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

  hoy = ""
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
              private activatedRoute: ActivatedRoute
  ) {
    function appendLeadingZeroes(n){
      if(n <= 9){
        return "0" + n;
      }
      return n
    }
    
    let current_datetime = new Date()
    console.log(current_datetime.toString());
    this.hoy = current_datetime.getFullYear() + "-" + appendLeadingZeroes(current_datetime.getMonth() + 1) + "-" + appendLeadingZeroes(current_datetime.getDate())
  
  }
  
  ngOnInit(): void {
    // Default Form
    const params = this.activatedRoute.snapshot.params; // para obtener la id 

     this.id=params.id
      this.get(params.id) // para obtener los datos
      

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
      fechaIngreso: new FormControl(this.hoy, [
        Validators.required,
      ]),
      fechaVencimiento: new FormControl(this.hoy, [
        Validators.required,
        
      ]),
      fechaComprobante: new FormControl(this.hoy, [
        Validators.required,
      ]),
      numeroComprobante: new FormControl(null, [
        Validators.required,
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
      numeroTransaccion: new FormControl(null, [
        
      ]),
      costoUnitario: new FormControl(null, [
        
      ]),
     
    },
    { validators: [this.checkFechasIngreso,this.checkFechasVencimiento,this.checkFechasComprobante] }
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
 
  checkFechasIngreso: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    let fecha = group.get('fechaIngreso').value;
    

    if ((fecha > "2019-01-02")&&(fecha < "2038-01-02")) {
      return null
    } else {
       this.defaultForm.controls['fechaIngreso'].setErrors({ noIgual: true })
       return { noIgual: true }
    }
  }
  checkFechasVencimiento: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    let fecha = group.get('fechaVencimiento').value;
    

    if ((fecha > "2019-01-02")&&(fecha < "2038-01-02")) {
      return null
    } else {
       this.defaultForm.controls['fechaVencimiento'].setErrors({ noIgual: true })
       return { noIgual: true }
    }
  }
  checkFechasComprobante: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    let fecha = group.get('fechaComprobante').value;
    

    if ((fecha > "2019-01-02")&&(fecha < "2038-01-02")) {
      return null
    } else {
       this.defaultForm.controls['fechaComprobante'].setErrors({ noIgual: true })
       return { noIgual: true }
    }
  }

 
 
   cambioUnidades(valor){
 
  this.defaultForm.controls["unidad"].setValue(this.productos[valor.split(",")[1]].unidad_id);
  
  this.valor=valor

 }


 calculoUnitario(){
   let  aux=parseFloat(this.defaultForm.controls["costo"].value)
   let cantidad=parseFloat(this.defaultForm.controls["cantidad"].value)
   let resultado = (aux/cantidad).toFixed(2)
   this.defaultForm.controls["costoUnitario"].setValue(resultado);
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




      this.transaccionesService.update(this.id,formData)
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
    get(id: string) {
      this.transaccionesService.getOne(id)
        .subscribe((response: any) => {
          let data = response.result[0]
           console.log(data) 
          
          this.defaultForm.controls["descripcion"].setValue(data["descripcion"]);
          this.defaultForm.controls["producto_id"].setValue(data["producto_id"]);
          this.defaultForm.controls["marca"].setValue(data["marca"]);
          this.defaultForm.controls["fechaIngreso"].setValue(data["fechaIngreso"]);
          this.defaultForm.controls["fechaVencimiento"].setValue(data["fechaVencimiento"]);
          this.defaultForm.controls["fechaComprobante"].setValue(data["fechaComprobante"]);
          this.defaultForm.controls["numeroComprobante"].setValue(data["numeroComprobante"]);
          this.defaultForm.controls["lote"].setValue(data["lote"]);
          this.defaultForm.controls["proveedor_id"].setValue(data["proveedor_id"]);
          this.defaultForm.controls["cantidad"].setValue(data["cantidad"]);
          this.defaultForm.controls["almacen"].setValue(data["almacen_id"]);
          this.defaultForm.controls["etapa"].setValue(data["etapa_id"]);
           this.defaultForm.controls["unidad"].setValue(data["unidad_id"]);
          this.defaultForm.controls["costo"].setValue(data["costo"]);
          this.defaultForm.controls["numeroTransaccion"].setValue(data["transaccion_id"]);
          this.defaultForm.controls["proveedor_tipo_pago"].setValue(data["metodopago_id"]);





          this.calculoUnitario()
          console.log(response);
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

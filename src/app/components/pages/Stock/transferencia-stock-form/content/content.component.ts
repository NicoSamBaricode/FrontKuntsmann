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
  
  transaccion : any= []
  etapas: any = []
  
  almacenes: any = []
 
  items: any = []
  update = false // para saber si es crear o actualizar
  
  constructor(private platosService: PlatosService,
    private transaccionesService: TransaccionesService,
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
        Validators.required,
      ]),
      cantidadEfectiva: new FormControl(null, [
        Validators.required,
      ]),
     
      lote: new FormControl(null, [
        Validators.required,
      ]),
      
      cantidad: new FormControl(null, [
        
      ]),
      almacen: new FormControl(null, [
        Validators.required,
      ]),
      etapa: new FormControl(null, [
        Validators.required,
      ]),
      
      
     
    },

    );
    
      this.etapasService.list()
      .subscribe((response: any) => { 
        //funcion para borrar de un array
      let nuevoArray=[]
       let aux= response.result.map((element:any)=>{        
            if(element.id!=this.transaccion.etapa_id){
              nuevoArray.push(element);
              return element
            }else{
              return element
            }
            
        }
        )
        this.etapas = nuevoArray
        
      }, (err: any) => {
        console.log(err);
      }
      )
      this.almacenesService.list()
      .subscribe((response: any) => {

       let nuevoArray=[]
       let aux= response.result.map((element:any)=>{        
            if(element.id!=this.transaccion.almacen_id){
              nuevoArray.push(element);
              return element
            }else{
              return element
            }
            
        }
        )
        this.almacenes = nuevoArray
      }, (err: any) => {
        console.log(err);
      }
      )
    
    
  }


  onSubmit() {

    if (true) {

      this.transaccionesService.transferencia(this.activatedRoute.snapshot.params.id, this.defaultForm.value)
        .subscribe((response: any) => {
          this.router.navigate(['/stock-list']);
        }, err => {
          console.log(err);
          Swal.fire({
            title: 'Atencion',
            text: 'No se puede guardar' + err.error.descripcion,
            icon: 'warning',
          })
        })

    } 
  }

 
  getData(id: string) {
    this.transaccionesService.getOne(id)
      .subscribe((response: any) => {
        let data = response.result[0]
        this.transaccion=data;
        console.log(data);
        this.items = response.ingredientes;
        this.defaultForm.controls["marca"].setValue(data["marca"]);
        this.defaultForm.controls["producto_id"].setValue(data["producto"]);
        this.defaultForm.controls["descripcion"].setValue(data["descripcion"]);
        this.defaultForm.controls["unidad"].setValue(data["unidad"]);
        this.defaultForm.controls["cantidadTotal"].setValue(data["cantidadTotal"]);
        this.defaultForm.controls["cantidadEfectiva"].setValue(data["cantidadEfectiva"]);
        this.defaultForm.controls["cantidad"].setValue(data["cantidad"]);
        this.defaultForm.controls["lote"].setValue(data["lote"]);
        this.defaultForm.controls["almacen"].setValue(data["almacen_id"]);
        this.defaultForm.controls["etapa"].setValue("");
       
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

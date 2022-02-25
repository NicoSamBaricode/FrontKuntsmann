import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { ProductosService } from 'src/app/services/productos.service';
import { PlatosService } from 'src/app/services/platos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  defaultForm: FormGroup;
  unidades:any=[];
  detalle = false // para saber si es crear o actualizar
  titulo = 'Agregar Nuevo'

  constructor(private productosServices: ProductosService,
              private platosServices: PlatosService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    // Default Form
    this,this.platosServices.listUnidades().subscribe(
      (resp:any)=>{
        this.unidades=resp.result
      },err=>{
        console.log(err)
      }
    )



    const params = this.activatedRoute.snapshot.params; // para obtener la id del usuario

    if (params.id) {
      
      this.getDatos(params.id) // para obtener los datos
     
    } 
    this.defaultForm = new FormGroup({
      descripcion: new FormControl(null, [ //aca el nombre tiene que coincidir con el nombre la columna de la base
      
      ]),
      unidad: new FormControl(1, [ //aca el nombre tiene que coincidir con el nombre la columna de la base
            
      ]),
      bajoStock: new FormControl(null, [ //aca el nombre tiene que coincidir con el nombre la columna de la base
               
      ]),
      margenStock: new FormControl(0, [ //aca el nombre tiene que coincidir con el nombre la columna de la base
              
      ]),
      margenVencimiento: new FormControl(0, [ //aca el nombre tiene que coincidir con el nombre la columna de la base
               
      ]),
      

    }

    );
  }



  onSubmit() {
    this.router.navigate(['/productos-list']);
  }

  getDatos(id: string) {
    this.productosServices.getOne(id)
      .subscribe((response: any) => {
        let data = response.result[0]
        this.defaultForm.controls["descripcion"].setValue(data["descripcion"]);
        this.defaultForm.controls["unidad"].setValue(data["unidad"]);
        this.defaultForm.controls["bajoStock"].setValue(data["bajoStock"]);
        this.defaultForm.controls["margenStock"].setValue(data["margenStock"]);
        this.defaultForm.controls["margenVencimiento"].setValue(data["margenVencimiento"]);


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

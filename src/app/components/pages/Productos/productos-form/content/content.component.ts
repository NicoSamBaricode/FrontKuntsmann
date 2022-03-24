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
  update = false // para saber si es crear o actualizar
  titulo = 'Agregar Nuevo'
  guardarV =''
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
      this.titulo = 'Modificar'
      this.getDatos(params.id) // para obtener los datos
      this.update = true
    } else {
      this.update = false
    }

    this.defaultForm = new FormGroup({
      descripcion: new FormControl(null, [ //aca el nombre tiene que coincidir con el nombre la columna de la base
        Validators.required,
        Validators.minLength(2),
      ]),
      unidad: new FormControl(1, [ //aca el nombre tiene que coincidir con el nombre la columna de la base
        Validators.required        
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

  guardar(guardarV){
    this.guardarV=guardarV
    
  }

  onSubmit() {
    console.log(this.guardarV)
    if (this.update) {

      this.productosServices.update(this.activatedRoute.snapshot.params.id, this.defaultForm.value)
        .subscribe((response: any) => {
          console.log(response);
          this.router.navigate(['/productos-list']);
        }, err => {
          console.log(err);
          Swal.fire({
            title: 'Atencion',
            text: 'No se puede guardar' + err.error.descripcion,
            icon: 'warning',
          })
        })

    } else {

      this.productosServices.create(this.defaultForm.value)
        .subscribe(response => {
          if (this.guardarV=='guardar') {
             this.router.navigate(['productos-list']);
          }
          if (this.guardarV=='agregar') {
            Swal.fire({
              
              text: 'Agregado con exito ',
              icon: 'success',
              timer: 1500,
            })
            this.defaultForm.reset()
         }
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

  getDatos(id: string) {
    this.productosServices.getOne(id)
      .subscribe((response: any) => {
        let data = response.result[0]
        this.defaultForm.controls["descripcion"].setValue(data["descripcion"]);
        this.defaultForm.controls["unidad"].setValue(data["unidad_id"]);
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

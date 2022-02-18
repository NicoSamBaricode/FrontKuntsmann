import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { ProveedoresService } from 'src/app/services/proveedores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  defaultForm: FormGroup;
  update = false // para saber si es crear o actualizar
  titulo = 'Agregar Nuevo'

  constructor(private proveedoresServices: ProveedoresService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    // Default Form

    const params = this.activatedRoute.snapshot.params; // para obtener la id del usuario

    if (params.id) {
      this.titulo = 'Modificar'
      this.getDatos(params.id) // para obtener los datos
      this.update = true
    } else {
      this.update = false
    }

    this.defaultForm = new FormGroup({
      descripcion: new FormControl('', [ //aca el nombre tiene que coincidir con el nombre la columna de la base
        Validators.required,
        Validators.minLength(4),
      ]),
      cuil: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.email
      ]),
      direccion: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      telefono: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),

    }

    );
  }



  onSubmit() {
    if (this.update) {

      this.proveedoresServices.update(this.activatedRoute.snapshot.params.id, this.defaultForm.value)
        .subscribe((response: any) => {
          console.log(response);
          this.router.navigate(['/proveedores-list']);
        }, err => {
          console.log(err);
          Swal.fire({
            title: 'Atencion',
            text: 'No se puede guardar' + err.error.descripcion,
            icon: 'warning',
          })
        })

    } else {

      this.proveedoresServices.create(this.defaultForm.value)
        .subscribe(response => {
          this.router.navigate(['proveedores-list']);
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
    this.proveedoresServices.getOne(id)
      .subscribe((response: any) => {
        let data = response.result[0]

        this.defaultForm.controls["descripcion"].setValue(data["descripcion"]);
        this.defaultForm.controls["cuil"].setValue(data["cuil"]);
        this.defaultForm.controls["email"].setValue(data["email"]);
        this.defaultForm.controls["direccion"].setValue(data["direccion"]);
        this.defaultForm.controls["telefono"].setValue(data["telefono"]);


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

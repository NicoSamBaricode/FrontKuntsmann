import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  defaultForm: FormGroup;
  roles: any = []
  update = false // para saber si es crear o actualizar

  constructor(private usuariosService: UsuariosService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    // Default Form

    const params = this.activatedRoute.snapshot.params; // para obtener la id del usuario

    if (params.id) {
      this.getUsusario(params.id) // para obtener el usuario
      this.update = true
    } else {
      this.update = false
    }

    this.defaultForm = new FormGroup({
      nombre: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      apellido: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required
      ]),
      password2: new FormControl('', [
        Validators.required,


      ]),
      rol: new FormControl('1', [
        Validators.required
      ]),
      estado: new FormControl(1)
    },
      { validators: this.checkPasswords }
    );
    this.usuariosService.listRoles()
      .subscribe((response: any) => {
        this.roles = response.result;
      }, (err: any) => {
        console.log(err);
      }
      )
  }

  checkPasswords: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    let pass = group.get('password').value;
    let confirmPass = group.get('password2').value

    if (pass === confirmPass) {
      return null
    } else {
      this.defaultForm.controls['password2'].setErrors({ noIgual: true })
      return { noIgual: true }
    }
  }


  onSubmit() {
    if (!this.defaultForm.valid) {
      Swal.fire({
        title: 'Atencion',
        text: "Las contraseñas no coinciden",
        icon: 'warning',
      })
    }
    if (this.update) {

      this.usuariosService.update(this.activatedRoute.snapshot.params.id, this.defaultForm.value)
        .subscribe((response: any) => {
          this.router.navigate(['/usuarios-list']);
        }, err => {
          console.log(err);
          Swal.fire({
            title: 'Atencion',
            text: 'No se puede guardar' + err.error.descripcion,
            icon: 'warning',
          })
        })

    } else {

      this.usuariosService.create(this.defaultForm.value)
        .subscribe(response => {
          this.router.navigate(['usuarios-list']);
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

  getUsusario(id: string) {
    this.usuariosService.getOne(id)
      .subscribe((response: any) => {
        let data = response.result[0]

        this.defaultForm.controls["nombre"].setValue(data["nombre"]);
        this.defaultForm.controls["apellido"].setValue(data["apellido"]);
        this.defaultForm.controls["email"].setValue(data["email"]);
        this.defaultForm.controls["rol"].setValue(data["rol_id"]);
        this.defaultForm.controls["estado"].setValue(data["estado"]);

        this.defaultForm.controls['password'].setValidators(null);
        this.defaultForm.controls['password2'].setValidators(null);

        if (data["id"] == 1) {
          this.defaultForm.controls['rol'].disable();
          this.defaultForm.controls['estado'].disable();
        }
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

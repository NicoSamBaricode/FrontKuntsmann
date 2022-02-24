import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { VentasService } from 'src/app/services/ventas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  defaultForm: FormGroup;
  update = false // para saber si es crear o actualizar
  

  constructor(private ventasServices: VentasService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    // Default Form

    const params = this.activatedRoute.snapshot.params; // para obtener la id del usuario

    

    this.defaultForm = new FormGroup({
      excel: new FormControl('', [ //aca el nombre tiene que coincidir con el nombre la columna de la base
        Validators.required,
        
      ])    

    }

    );
  }



  onSubmit() {
   
      this.ventasServices.create(this.defaultForm.value)
        .subscribe(response => {
          Swal.fire({
            title: 'Atencion',
            text: 'Guardado exitoso',
            icon: 'success',
          })
          this.router.navigate(['almacenes-list']);
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

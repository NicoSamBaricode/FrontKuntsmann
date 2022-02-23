import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { PlatosService } from 'src/app/services/platos.service';
import { VentasService } from 'src/app/services/ventas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  defaultForm: FormGroup;
  articulos: any=[]

  constructor(private platosServices: PlatosService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private ventasService: VentasService) {

  }

  ngOnInit(): void {
    // Default Form

    this.defaultForm = new FormGroup({
      plato_id: new FormControl('', [ //aca el nombre tiene que coincidir con el nombre la columna de la base
        Validators.required,
        Validators.minLength(2),
      ]),
      cantidad: new FormControl('', [ //aca el nombre tiene que coincidir con el nombre la columna de la base
        Validators.required,
        Validators.minLength(1),
      ]),
      

    }

    );

    this.platosServices.list()
        .subscribe((response: any) => {
          console.log(response.result)
      this.articulos = response.result;
    }, (err: any) => {
      console.log(err);
    }
    )
  }



  onSubmit() {
    

      this.ventasService.createManual(this.defaultForm.value)
        .subscribe(response => {
          this.router.navigate(['ventas-list']);
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
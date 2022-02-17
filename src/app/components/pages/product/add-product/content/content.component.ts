import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { PlatosService } from 'src/app/services/platos.service';
import { ProductosService } from 'src/app/services/productos.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  defaultForm: FormGroup;
  unidades: any = []
  ingredientes: any = []
  productos: any = []
  items: any = []
  update = false // para saber si es crear o actualizar
  titulo = "Agregar"
  constructor(private platosService: PlatosService, private productosServices: ProductosService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {

  }
  defaultslide = [
    { img: "assets/img/costic/add-product-1.jpg", title: "img" },

  ];
  ngOnInit(): void {
    // Default Form

    const params = this.activatedRoute.snapshot.params; // para obtener la id del usuario

    if (params.id) {
      this.titulo = "Modificar"
      this.getData(params.id) // para obtener el usuario
      this.update = true
    } else {
      this.update = false
    }

    this.defaultForm = new FormGroup({
      descripcion: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      plato_id: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
      ]),
      imagen: new FormControl('', [


      ]),
      info: new FormControl('', [

      ]),
      preparacion: new FormControl('', [



      ]),
      costo: new FormControl('', [
        Validators.required
      ]),
      auto: new FormControl('', [

      ]),
      precio: new FormControl('', [
        Validators.required
      ]),
      margen: new FormControl('', [

      ]),
    },

    );
    this.productosServices.list()
      .subscribe((response: any) => {
        this.productos = response.result;
      }, (err: any) => {
        console.log(err);
      }
      )
      this.platosService.create
      .subscribe((response: any) => {
        this.productos = response.result;
      }, (err: any) => {
        console.log(err);
      }
      )
  }


  onSubmit() {

    if (this.update) {

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
    this.platosService.getOne(id)
      .subscribe((response: any) => {
        let data = response.result[0]

        this.defaultForm.controls["descripcion"].setValue(data["descripcion"]);
        this.defaultForm.controls["plato_id"].setValue(data["plato_id"]);
        this.defaultForm.controls["imagen"].setValue(data["imagen"]);
        this.defaultForm.controls["info"].setValue(data["info"]);
        this.defaultForm.controls["preparacion"].setValue(data["preparacion"]);
        this.defaultForm.controls["costo"].setValue(data["costo"]);
        this.defaultForm.controls["precio"].setValue(data["precio"]);
        this.defaultForm.controls["margen"].setValue(data["margen"]);
        this.defaultForm.controls["auto"].setValue(data["auto"]);



        this.defaultForm.controls['plato_id'].disable();


      }, error => {
        console.log(error);
        Swal.fire({
          title: 'Atencion',
          text: 'No hay conexion con base de datos' + error.error.descripcion,
          icon: 'warning',
        })
      });
  }
  agregarIngredientes() {
   console.log(this.ingredientes)
  }
}

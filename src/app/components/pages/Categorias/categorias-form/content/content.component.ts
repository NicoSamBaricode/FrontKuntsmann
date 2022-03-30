import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriasService } from 'src/app/services/categorias.service';
import Swal from 'sweetalert2';
import { LocalDataSource } from 'ng2-smart-table';
@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  defaultForm: FormGroup;
  update = false // para saber si es crear o actualizar
  titulo = 'Agregar Nueva'
  guardarV = ''
  constructor(private categoriasServices: CategoriasService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {

  }
  source: LocalDataSource;
  settings = {
    hideSubHeader: true,
    pager: {
      perPage: 10,
    },
    noDataMessage: 'Ninguna Categoria Agregada',
    mode: external,
    columns: {


      id: {
        
        filter: true,
        hide: true
      },
      descripcion: {
      
        title: 'Nombre Categoria',
        filter: true

      },
      


    },
    delete: {

      deleteButtonContent: '<i class="far fa-trash-alt color-red" title="delete" ></i> ',

    },
    actions: {
      columnTitle: "Acciones",
      position: "right",


      add: false,
      edit: false,
      delete: true,
      defaultStyle: false
    },
  };
  onCustom(event) {
    if (event.action == 'deleteAction') {
      Swal.fire({
        title: 'Esta por eliminar un registro',
        text: "Esta seguro?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Borrar!',
        cancelButtonText: 'Cancelar'

      }).then((result) => {
        if (result.isConfirmed) {
          // this.deleteAceptado(event.data["id"]);
          
          Swal.fire(
            'Registro eliminado con exito!',
            '',
            'success'
          )
        }
      })



    }

  }
  ngOnInit(): void {
    // Default Form
    this.source = new LocalDataSource();
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
        Validators.minLength(2),
      ]),
      

    }

    );
  }

  guardar(guardarV) {
    this.guardarV = guardarV

  }
  guardarABase() {
    
    let data = [];
    this.source.getAll().then(value => {
      value.forEach(element => {
       
        data.push(element);
      });
      
      this.categoriasServices.create(data)
        .subscribe(response => {
          console.log(response)
          this.router.navigate(['categorias-list']);
        }, error => {
          console.log(error);
          // if (error.error.descripcion === 'ER_DUP_ENTRY') {
          //   Swal.fire({
          //     title: 'Atencion',
          //     text: 'Ya existe ',
          //     icon: 'warning',
          //   })
          // } else {
          Swal.fire({
            title: 'Atencion',
            // text: 'Contactar al servicio técnico Baricode ' + error.error.descripcion,
            icon: 'error',
          })
          // }

        });

    });
  }

  onSubmit() {
    if (this.update) {

      this.categoriasServices.update(this.activatedRoute.snapshot.params.id, this.defaultForm.value)
        .subscribe((response: any) => {
          console.log(response);
          this.router.navigate(['/categorias-list']);
        }, err => {
          console.log(err);
          Swal.fire({
            title: 'Atencion',
            text: 'No se puede guardar' + err.error.descripcion,
            icon: 'warning',
          })
        })

    } else {

      // this.categoriasServices.create(this.defaultForm.value)
      //   .subscribe(response => {
      //     this.router.navigate(['categorias-list']);
      //   }, error => {
      //     console.log(error);
      //     if (error.error.descripcion === 'ER_DUP_ENTRY') {
      //       Swal.fire({
      //         title: 'Atencion',
      //         text: 'Ya existe ',
      //         icon: 'warning',
      //       })
      //     } else {
      //       Swal.fire({
      //         title: 'Atencion',
      //         text: 'Contactar al servicio técnico Baricode ' + error.error.descripcion,
      //         icon: 'error',
      //       })
      //     }

      //   });
      if (this.guardarV == 'agregar') {
       
        this.source.append(this.defaultForm.value)
        this.defaultForm.reset()
  
      }
    }

  }

  getDatos(id: string) {
    this.categoriasServices.getOne(id)
      .subscribe((response: any) => {
        let data = response.result[0]

        this.defaultForm.controls["descripcion"].setValue(data["descripcion"]);      


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

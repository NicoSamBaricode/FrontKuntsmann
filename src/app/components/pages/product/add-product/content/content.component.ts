import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { IngredientesService } from 'src/app/services/ingredientes.service';
import { PlatosService } from 'src/app/services/platos.service';
import { ProductosService } from 'src/app/services/productos.service';
import { CategoriasService } from 'src/app/services/categorias.service';

import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { DomSanitizer } from '@angular/platform-browser';

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
  productos: any = []
  items: any = []
  categorias: any = []
  imagen :any = 0
  update = false // para saber si es crear o actualizar
  titulo = "Agregar"

  fileData: File = null;
  previewImagen = null;



  constructor(  private platosService: PlatosService,
                private productosService: ProductosService,
                private ingredientesService: IngredientesService,
                private categoriasService: CategoriasService,
                private router: Router,
                private activatedRoute: ActivatedRoute,
                private sanitizer: DomSanitizer) {

  }
  defaultslide = [
    { img: "assets/img/costic/add-product-1.jpg", title: "img" },

  ];
  ngOnInit(): void {
<<<<<<< HEAD
   
    const params = this.activatedRoute.snapshot.params; 
=======
    // Default Form

    const params = this.activatedRoute.snapshot.params;
>>>>>>> 957e600b60ddc3d51d8e3db86cb8f979c32d0dd1

    if (params.id) {
      this.id = params.id;
      this.titulo = "Modificar"
      this.platosService.getOne(this.id)
<<<<<<< HEAD
      .subscribe((response: any) => {
        let data = response.result[0]
        this.items = response.ingredientes;
        this.defaultForm.controls["descripcion"].setValue(data["descripcion"]);
        this.defaultForm.controls["articulo_id"].setValue(data["articulo_id"]);
        this.defaultForm.controls["info"].setValue(data["info"]);
        this.defaultForm.controls["preparacion"].setValue(data["preparacion"]);
        this.defaultForm.controls["costo"].setValue(data["costo"]);
        this.defaultForm.controls["precio"].setValue(data["precio"]);
        this.defaultForm.controls["margen"].setValue(data["margen"]);
        this.defaultForm.controls["auto"].setValue(data["auto"]);
        this.defaultForm.controls["categoria"].setValue(data["categoria_id"]);

         this.platosService.imagen(data["imagen"])
         .subscribe((response: any) => {
           this.previewImagen = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(response));
         }, err => {
           console.log(err);
         })


      }, error => {
        console.log(error);
        Swal.fire({
          title: 'Atencion',
          text: 'No hay conexion con base de datos' + error.error.descripcion,
          icon: 'warning',
        })
      }); 
=======
        .subscribe((response: any) => {
          let data = response.result[0]
          this.items = response.ingredientes;
          this.defaultForm.controls["descripcion"].setValue(data["descripcion"]);
          this.defaultForm.controls["articulo_id"].setValue(data["articulo_id"]);
          this.defaultForm.controls["imagen"].setValue(data["imagen"]);
          this.defaultForm.controls["info"].setValue(data["info"]);
          this.defaultForm.controls["preparacion"].setValue(data["preparacion"]);
          this.defaultForm.controls["costo"].setValue(data["costo"]);
          this.defaultForm.controls["precio"].setValue(data["precio"]);
          this.defaultForm.controls["margen"].setValue(data["margen"]);
          this.defaultForm.controls["auto"].setValue(data["auto"]);
          this.defaultForm.controls["categoria"].setValue(data["categoria_id"]);
        }, error => {
          console.log(error);
          Swal.fire({
            title: 'Atencion',
            text: 'No hay conexion con base de datos' + error.error.descripcion,
            icon: 'warning',
          })
        });
>>>>>>> 957e600b60ddc3d51d8e3db86cb8f979c32d0dd1
      this.update = true
    } else {
      this.update = false
    }

    this.defaultForm = new FormGroup({
      descripcion: new FormControl(null, [
        Validators.required,
        Validators.minLength(4),
      ]),
      articulo_id: new FormControl(null, [
        Validators.required,
        Validators.minLength(1),
      ]),
      imagen: new FormControl(null, [


      ]),
      info: new FormControl(null, [

      ]),
      preparacion: new FormControl(null, [



      ]),
      categoria: new FormControl(null, [

        Validators.required,

      ]),
      costo: new FormControl(null, [
      ]),
      auto: new FormControl(null, [

      ]),
      precio: new FormControl(null, [
        Validators.required
      ]),
      margen: new FormControl(null, [

      ]),
      productosNO: new FormControl(null, [

      ]),
      unidadesNO: new FormControl(null, [

      ]),
      cantidadNO: new FormControl(null, [

      ]),
    },

    );
    this.productosService.list()
      .subscribe((response: any) => {
        this.productos = response.result;
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
    this.categoriasService.list()
      .subscribe((response: any) => {
        this.categorias = response.result;
      }, (err: any) => {
        console.log(err);
      }
      )
  }



  uploadFile(file:any) {  
    this.fileData = <File>file.target.files[0];
    if(this.fileData){
    const reader = new FileReader();

    reader.onload = (file:any) => {
      this.previewImagen = file.target.result;

     
    }
    reader.readAsDataURL(<File>file.target.files[0])
  }
    
  }




  onSubmit() {

        ////////////////////////

        const formData = new FormData();

        let datosJson= this.defaultForm.getRawValue();
    
        formData.append('data', JSON.stringify( datosJson));
        if(this.fileData){
          formData.append('imagen', this.fileData);
        }
        
    
    //////////////////////////

    if (this.update || this.id) {
      this.getData(this.id);
      this.platosService.update(this.id, formData)
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

      this.platosService.create(formData)
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
        this.items = response.ingredientes;
        this.defaultForm.controls["descripcion"].setValue(data["descripcion"]);
        this.defaultForm.controls["articulo_id"].setValue(data["articulo_id"]);
        //this.defaultForm.controls["imagen"].setValue(data["imagen"]);
        this.defaultForm.controls["info"].setValue(data["info"]);
        this.defaultForm.controls["preparacion"].setValue(data["preparacion"]);
        if (this.defaultForm.get('auto').value) {
          this.defaultForm.controls["costo"].setValue(data["costo"]);
          this.defaultForm.controls["precio"].setValue(data["precio"]);
          this.defaultForm.controls["margen"].setValue(data["margen"]);
        } else {
          this.defaultForm.controls["costo"].setValue(data["costo"]);
          this.defaultForm.controls["precio"].setValue(data["precio"]);
          this.defaultForm.controls["margen"].setValue(data["margen"]);
        }

        //this.defaultForm.controls["auto"].setValue(data["auto"]);
        this.defaultForm.controls["categoria"].setValue(data["categoria_id"]);
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
<<<<<<< HEAD


        const formData = new FormData();

        let datosJson= this.defaultForm.getRawValue();
    
        formData.append('data', JSON.stringify( datosJson));
        if(this.fileData){
          formData.append('imagen', this.fileData);
        }

    if(this.id){
      this.addItem()
    }else{
      this.platosService.create(formData)
        .subscribe((response:any) => {
          this.id=response['id'];
=======
    if (this.id) {
      this.addItem()
    } else {
      this.platosService.create(this.defaultForm.value)
        .subscribe((response: any) => {
          this.id = response['id'];
>>>>>>> 957e600b60ddc3d51d8e3db86cb8f979c32d0dd1
          this.addItem()
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

  eliminar_ingrediente(id: string) {
    this.ingredientesService.delete(id)
      .subscribe((response: any) => {

        this.getData(this.id);
      }, (err: any) => {
        console.log(err);
      });
  }



  addItem() {


    const formData = new FormData();

    let datosJson= this.defaultForm.getRawValue();

    formData.append('data', JSON.stringify( datosJson));
    if(this.fileData){
      formData.append('imagen', this.fileData);
    }



    if (!!this.ingredientes.producto_id && !!this.ingredientes.cantidad && !!this.ingredientes.unidad) {

      let ji = { "plato_id": this.id, "producto_id": this.ingredientes.producto_id, "cantidad": this.ingredientes.cantidad, "unidad": this.ingredientes.unidad }

      this.ingredientesService.create(ji)
<<<<<<< HEAD
      .subscribe((response: any) => {
        this.platosService.update(this.id, formData)
=======
>>>>>>> 957e600b60ddc3d51d8e3db86cb8f979c32d0dd1
        .subscribe((response: any) => {
          this.platosService.update(this.id, this.defaultForm.value)
            .subscribe((response: any) => {
              this.getData(this.id);
            }, err => {
              console.log(err);
              Swal.fire({
                title: 'Atencion',
                text: 'No se puede guardar' + err.error.descripcion,
                icon: 'warning',
              })
            })

        }, (err: any) => {
          console.log(err)
        }
        )



    } else {
      Swal.fire({
        title: 'Atencion',
        text: 'Debe llenar ingrediente, cantidad y unidad',
        icon: 'warning',
      })
    }

  }

  changeAuto(event) {
    let costo = 0;
    if (this.defaultForm.get('auto').value) {

      for (let i = 0; i < this.items.length; i++) {

        if (this.items[i].costo) {
          costo = costo + parseFloat(this.items[i].costo);
        } else {
          costo = costo + 0;
        }
      }
      this.defaultForm.controls['costo'].setValue(costo);
      this.defaultForm.controls['costo'].disable();

    } else {
      this.defaultForm.controls['costo'].enable();
    }
  }

  imagenSeleccionada(event) {
    if (event.target.files.length >0) {
     const file = event.target.files[0];
     this.imagen =file;
    }
  }




}

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
  factores: any = []
  unidadesF: any = []
  ingredientes: any = []
  productos: any = []
  items: any = []
  costos: any = []
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
    // Default Form

    const params = this.activatedRoute.snapshot.params;

    if (params.id) {
      this.id = params.id;
      this.titulo = "Modificar"
      this.platosService.getOne(this.id)
        .subscribe((response: any) => {
          let data = response.result[0]
          this.items = response.ingredientes;

          this.items = this.items.map (x=>{
            if(x.costo==null)
            x.costo="Sin datos"
            return x;
          })


          this.defaultForm.controls["descripcion"].setValue(data["descripcion"]);
          this.defaultForm.controls["articulo_id"].setValue(data["articulo_id"]);
          //this.defaultForm.controls["imagen"].setValue(data["imagen"]);
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
      ingredientes: new FormControl(null, [

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

      this.platosService.listFactores()
      .subscribe((response: any) => {
        this.factores = response.result;
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

      this.platosService.costo()
      .subscribe((response: any) => {
        this.costos= response.result;
      }, (err: any) => {
        console.log(err);
      })


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
        this.defaultForm.controls["ingredientes"].setValue(this.items);
        let datosJson= this.defaultForm.getRawValue();
    
        formData.append('data', JSON.stringify( datosJson));
        if(this.fileData){
          formData.append('imagen', this.fileData);
        }
        
    
    //////////////////////////
    if(!this.update){
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
    else{
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
  }
  agregarIngredientes() {
    if (!!this.ingredientes.producto_id && !!this.ingredientes.cantidad && !!this.ingredientes.unidad) {

    let producto = this.productos.filter(x => x.id == this.ingredientes.producto_id)[0]
    let unidad = this.unidades.filter(x => x.id == this.ingredientes.unidad)[0]
    let costo = this.costos.filter(x => x.id == this.ingredientes.producto_id)[0]
    
    if (costo.costoUnitario){
      let factor = this.calculoFactor(this.ingredientes.unidad,producto.unidad_id)

      costo = parseFloat((costo.costoUnitario * this.ingredientes.cantidad * factor).toFixed(2));
    }else{
      costo="Sin datos";
    }

    this.items.push({

      producto_id: this.ingredientes.producto_id,
      descripcion: producto.descripcion,
      cantidad: this.ingredientes.cantidad,
      unidad:unidad.descripcion,
      costo: costo,
      unidad_id: this.ingredientes.unidad,
    });

    this.costo();
  }else{
    Swal.fire({
      title: 'Atencion',
      text: 'Debe llenar ingrediente, cantidad y unidad',
      icon: 'warning',
    })
  }
    }

  calculoFactor(unidadIngrediente, unidadProducto):number{

    let factor = this.factores.filter(x=>(x.de == unidadIngrediente && x.a == unidadProducto))[0]

    return factor.factor
  }


  eliminar_ingrediente(id: string) {

    this.items.splice(id, 1);

    this.costo()
  }

  cambio(){
    let producto = this.productos.filter(x => x.id == this.ingredientes.producto_id)[0]
    let unidad = this.unidades.filter(x => x.id == producto.unidad_id)[0]
    this.unidadesF= this.unidades.filter(x => x.clase == unidad.clase)
    this.ingredientes.unidad=this.unidadesF[0].id
  }

  changeAuto(event) {
    let costo = 0;
      costo = this.costo()
  }

  costo(){
    let costo = 0
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].costo!="Sin datos") {
       costo = costo + parseFloat(this.items[i].costo);
      } else {
       costo = costo + 0;
      }
    }
    if (this.defaultForm.get('auto').value) {

      this.defaultForm.controls['costo'].setValue(costo);
      this.defaultForm.controls['costo'].disable();

    } else {
      this.defaultForm.controls['costo'].enable();
    }
    this.margen();
    return costo
  }

  margen(){
    let costo = this.defaultForm.get('costo').value
    let precio = this.defaultForm.get('precio').value

    this.defaultForm.controls['margen'].setValue(parseFloat(((precio - costo)).toFixed(2)));
  }

  imagenSeleccionada(event) {
    if (event.target.files.length >0) {
     const file = event.target.files[0];
     this.imagen =file;
    }
  }




}

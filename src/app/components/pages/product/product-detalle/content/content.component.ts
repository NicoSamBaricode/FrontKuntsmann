import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { IngredientesService } from 'src/app/services/ingredientes.service';
import { PlatosService } from 'src/app/services/platos.service';
import { ProductosService } from 'src/app/services/productos.service';
import { CategoriasService } from 'src/app/services/categorias.service';

import Swal from 'sweetalert2';

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
  categorias: any =[]
  detalle = false // para saber si es crear o actualizar
  titulo = "Agregar"
  constructor(  private platosService: PlatosService,
                private productosService: ProductosService,
                private ingredientesService: IngredientesService,
                private categoriasService: CategoriasService,
                private router: Router,
                private activatedRoute: ActivatedRoute) {

  }
  defaultslide = [
    { img: "assets/img/costic/add-product-1.jpg", title: "img" },

  ];
  ngOnInit(): void {
    // Default Form

    const params = this.activatedRoute.snapshot.params; 
     
    if (params.id) {
      this.id= params.id;
      
      this.getData(params.id) 

      this.detalle = true
    } else {
      this.detalle = false
    }

    this.defaultForm = new FormGroup({
      descripcion: new FormControl(null, [
       
      ]),
      articulo_id: new FormControl(null, [
       
      ]),
      imagen: new FormControl(null, [


      ]),
      info: new FormControl(null, [

      ]),
      preparacion: new FormControl(null, [


      ]),
      categoria: new FormControl(null, [

        

      ]),
      costo: new FormControl(null, [
      ]),
      
      precio: new FormControl(null, [
       
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


  onSubmit() {
    this.router.navigate(['/product/product-list']);
    
  }

  getData(id: string) {
    this.platosService.getOne(id)
      .subscribe((response: any) => {
        let data = response.result[0]
        console.log(response.result);
        this.items = response.ingredientes;
        this.defaultForm.controls["descripcion"].setValue(data["descripcion"]);
        this.defaultForm.controls["articulo_id"].setValue(data["articulo_id"]);
        this.defaultForm.controls["imagen"].setValue(data["imagen"]);
        this.defaultForm.controls["info"].setValue(data["info"]);
        this.defaultForm.controls["preparacion"].setValue(data["preparacion"]);
        this.defaultForm.controls["costo"].setValue(data["costo"]);
        this.defaultForm.controls["precio"].setValue(data["precio"]);
        this.defaultForm.controls["margen"].setValue(data["margen"]);        
        this.defaultForm.controls["categoria"].setValue(data["categoria"]);
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

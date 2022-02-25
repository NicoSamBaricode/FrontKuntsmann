import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductosDetalleRoutingModule } from './productos-detalle-routing.module';
import { ProductosDetalleComponent } from './productos-detalle.component';
import { ContentComponent } from './content/content.component';


@NgModule({
  declarations: [
    ProductosDetalleComponent,
    ContentComponent
  ],
  imports: [
    CommonModule,
    ProductosDetalleRoutingModule
  ]
})
export class ProductosDetalleModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductosDetalleComponent } from './productos-detalle.component';

const routes: Routes = [{ path: '', component: ProductosDetalleComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductosDetalleRoutingModule { }

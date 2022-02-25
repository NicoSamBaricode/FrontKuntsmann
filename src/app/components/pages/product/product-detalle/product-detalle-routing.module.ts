import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetalleComponent } from './product-detalle.component';

const routes: Routes = [{ path: '', component: ProductDetalleComponent },{ path: 'detalle/:id', component: ProductDetalleComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductDetalleRoutingModule { }

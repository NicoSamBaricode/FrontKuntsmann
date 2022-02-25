import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StockDetalleFormComponent } from './stock-detalle-form.component';

const routes: Routes = [{ path: '', component: StockDetalleFormComponent },{ path: '/detalle/:id', component: StockDetalleFormComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StockDetalleFormRoutingModule { }

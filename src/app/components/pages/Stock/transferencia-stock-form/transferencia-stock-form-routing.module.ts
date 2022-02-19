import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransferenciaStockFormComponent } from './transferencia-stock-form.component';

const routes: Routes = [{ path: '', component: TransferenciaStockFormComponent },{ path: 'update/:id', component: TransferenciaStockFormComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransferenciaStockFormRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StockEditarComponent } from './stock-editar.component';

const routes: Routes = [{ path: ':id', component: StockEditarComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StockEditarRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StockListComponent } from './stock-list.component';

const routes: Routes = [{ path: '', component: StockListComponent },{ path: 'detalle/:id', component: StockListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StockListRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StockTotalListComponent } from './stock-total-list.component';

const routes: Routes = [{ path: '', component: StockTotalListComponent },{ path: 'editar/:id', component: StockTotalListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StockTotalListRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StockFormComponent } from './stock-form.component';

const routes: Routes = [{ path: '', component: StockFormComponent },{ path: 'update/:id', component: StockFormComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StockFormRoutingModule { }

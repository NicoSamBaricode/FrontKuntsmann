import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VentasExcelFormComponent } from './ventas-excel-form.component';

const routes: Routes = [{ path: '', component: VentasExcelFormComponent },{ path: 'update/:id', component: VentasExcelFormComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VentasExcelFormRoutingModule { }

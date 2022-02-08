import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VentasFormComponent } from './ventas-form.component';

const routes: Routes = [{ path: '', component: VentasFormComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VentasFormRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProveedoresFormComponent } from './proveedores-form.component';

const routes: Routes = [{ path: '', component: ProveedoresFormComponent },{ path: 'update/:id', component: ProveedoresFormComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProveedoresFormRoutingModule { }

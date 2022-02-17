import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductosFormComponent } from './productos-form.component';

const routes: Routes = [{ path: '', component: ProductosFormComponent },{ path: 'update/:id', component: ProductosFormComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductosFormRoutingModule { }

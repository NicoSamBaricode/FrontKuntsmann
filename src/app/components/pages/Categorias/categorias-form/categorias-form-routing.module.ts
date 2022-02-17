import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriasFormComponent } from './categorias-form.component';

const routes: Routes = [{ path: '', component: CategoriasFormComponent },{ path: 'update/:id', component: CategoriasFormComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriasFormRoutingModule { }

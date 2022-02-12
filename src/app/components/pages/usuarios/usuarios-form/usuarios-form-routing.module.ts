import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosFormComponent } from './usuarios-form.component';

const routes: Routes = [{ path: '', component: UsuariosFormComponent },
                        { path: 'update/:id', component: UsuariosFormComponent }];        

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosFormRoutingModule { }
